import BlogData from "@/components/Blog/blogData";
import BlogItem from "@/components/Blog/BlogItem";
import { Metadata } from "next";

// Force dynamic rendering to prevent SSR issues
export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: "Blog Page - Dataverse SaaS Boilerplate",
  description: "This is Blog page for Dataverse Pro",
  // other metadata
};

const BlogPage = async () => {
  return (
    <>
      {/* <!-- ===== Blog Grid Start ===== --> */}
      <section className="py-20 lg:py-25 xl:py-30">
        <div className="mx-auto mt-15 max-w-c-1280 px-4 md:px-8 xl:mt-20 xl:px-0">
          <div className="grid grid-cols-1 gap-7.5 md:grid-cols-2 lg:grid-cols-3 xl:gap-10">
            <div className="mx-auto mt-15 max-w-c-1280 px-4 md:px-8 xl:mt-20 xl:px-0 text-center mx-auto">
              No Upcoming News and Events
              <div className="grid grid-cols-1 gap-7.5 md:grid-cols-2 lg:grid-cols-3 xl:gap-10 ">
                {/* {BlogData.slice(0, 3).map((blog, key) => (
      <BlogItem blog={blog} key={key} />
    ))} */}
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* <!-- ===== Blog Grid End ===== --> */}
    </>
  );
};

export default BlogPage;
