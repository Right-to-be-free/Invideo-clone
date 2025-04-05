import Link from "next/link";

export const CategoryCard = ({ category }: { category: any }) => {
  return (
    <Link href={`/category/${category.slug}`}>
      <div className="rounded-2xl border border-gray-200 p-6 hover:shadow-md transition-all">
        <div className="text-3xl mb-4">{category.icon}</div>
        <h3 className="text-lg font-semibold text-gray-800">{category.title}</h3>
        <p className="text-sm text-gray-600">{category.description}</p>
      </div>
    </Link>
  );
};
