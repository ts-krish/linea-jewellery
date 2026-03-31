import { Category } from "@/modules/category";

const CategoryPage = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  const { slug } = await params;

  return <Category slug={slug} />;
};

export default CategoryPage;