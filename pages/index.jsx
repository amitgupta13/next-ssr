import fs from "fs/promises";
import path from "path";
import Link from "next/link";

function HomePage({ products }) {
  return (
    <ul>
      {products.map((item) => (
        <li key={item.id}>
          <Link
            href={{
              pathname: "/products/[id]",
              query: {
                id: item.id,
              },
            }}
          >
            {item.title}
          </Link>
        </li>
      ))}
    </ul>
  );
}

export async function getStaticProps(context) {
  console.log("Regenerating...");
  const jsonData = await fs.readFile(
    path.join(process.cwd(), "data", "dummy-backend.json")
  );

  const data = JSON.parse(jsonData);

  // if (!data) return { redirect: { destination: "/no-data" } };

  // if (data.products.length === 0) return { notFound: true };
  return {
    props: {
      products: data.products,
    },
    revalidate: 10,
  };
}

export default HomePage;
