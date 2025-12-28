import { useParams } from "react-router-dom";

const CategoryPage = () => {
  const { slug } = useParams();

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold">
        Category: {slug}
      </h1>
    </div>
  );
};

export default CategoryPage;
