const SYSTEME_API_BASE = 'https://api.systeme.io/api';

interface SystemeContact {
  id: number;
  email: string;
  tags?: { id: number; name: string }[];
}

interface SystemeListResponse<T> {
  items: T[];
  hasMore: boolean;
}

function getApiKey(): string | null {
  return process.env.SYSTEME_IO_API_KEY || null;
}

async function systemeFetch<T>(
  path: string,
  options: RequestInit = {}
): Promise<T | null> {
  const apiKey = getApiKey();
  if (!apiKey) {
    console.warn('SYSTEME_IO_API_KEY is not configured — skipping Systeme.io sync');
    return null;
  }

  const response = await fetch(`${SYSTEME_API_BASE}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      'X-API-Key': apiKey,
      ...options.headers,
    },
  });

  if (response.status === 204) {
    return null;
  }

  if (!response.ok) {
    const body = await response.text();
    throw new Error(`Systeme.io API error (${response.status}): ${body}`);
  }

  if (response.status === 201 || response.headers.get('content-type')?.includes('application/json')) {
    const text = await response.text();
    return text ? (JSON.parse(text) as T) : null;
  }

  return null;
}

async function findContactByEmail(email: string): Promise<SystemeContact | null> {
  const data = await systemeFetch<SystemeListResponse<SystemeContact>>(
    `/contacts?email=${encodeURIComponent(email.toLowerCase())}`
  );
  return data?.items?.[0] ?? null;
}

async function createContact(input: {
  email: string;
  firstName: string;
  lastName: string;
  phone?: string | null;
}): Promise<SystemeContact> {
  const contact = await systemeFetch<SystemeContact>('/contacts', {
    method: 'POST',
    body: JSON.stringify({
      email: input.email.toLowerCase(),
      firstName: input.firstName,
      lastName: input.lastName,
      ...(input.phone ? { phoneNumber: input.phone } : {}),
    }),
  });

  if (!contact?.id) {
    throw new Error('Systeme.io did not return a contact id after creation');
  }

  return contact;
}

async function getOrCreateContact(input: {
  email: string;
  firstName: string;
  lastName: string;
  phone?: string | null;
}): Promise<SystemeContact> {
  const existing = await findContactByEmail(input.email);
  if (existing) {
    return existing;
  }

  try {
    return await createContact(input);
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    if (message.includes('already used')) {
      const contact = await findContactByEmail(input.email);
      if (contact) return contact;
    }
    throw error;
  }
}

async function assignTagToContact(contactId: number, tagId: number): Promise<void> {
  await systemeFetch(`/contacts/${contactId}/tags`, {
    method: 'POST',
    body: JSON.stringify({ tagId }),
  });
}

export async function syncApplicantToSysteme(input: {
  email: string;
  firstName: string;
  lastName: string;
  phone?: string | null;
  tagId: number;
}): Promise<{ contactId: number; tagId: number } | null> {
  if (!getApiKey()) {
    return null;
  }

  const contact = await getOrCreateContact(input);
  await assignTagToContact(contact.id, input.tagId);

  return { contactId: contact.id, tagId: input.tagId };
}

export async function subscribeToNewsletter(input: {
  email: string;
  firstName?: string;
  lastName?: string;
  tagId: number;
}): Promise<{ contactId: number } | null> {
  if (!getApiKey()) {
    return null;
  }

  const contact = await getOrCreateContact({
    email: input.email,
    firstName: input.firstName || 'Subscriber',
    lastName: input.lastName || '',
  });

  await assignTagToContact(contact.id, input.tagId);

  return { contactId: contact.id };
}
