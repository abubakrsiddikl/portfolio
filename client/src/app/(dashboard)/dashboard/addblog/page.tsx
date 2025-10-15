import AddBlogModal from "@/components/modules/Blogs/Modal/AddBlogModal";
import BlogTable from "@/components/modules/Blogs/Table/BlogTable";
import { getAllBlogs } from "@/services";


export default async function AddBlogPage() {
  const blogs = await getAllBlogs();
  return (
    <div>
      {/* add blog modal */}
      <div className="flex justify-end items-center mb-5">
        <AddBlogModal></AddBlogModal>
      </div>
      {/* blog table */}
      <div>
        <BlogTable blogs={blogs || []}></BlogTable>
      </div>
    </div>
  );
}
