import { Fragment } from "react";
import fs from "fs/promises";
import path from "path";

export default function ProductDetailPage({ product }) {
  if (!product) return <p>Loading...</p>;
  return (
    <Fragment>
      <h1>{product.title}</h1>
      <p>{product.description}</p>
    </Fragment>
  );
}

async function getData() {
  const jsonData = await fs.readFile(
    path.join(process.cwd(), "data", "dummy-backend.json")
  );
  return JSON.parse(jsonData);
}

export async function getStaticPaths(context) {
  const data = await getData();
  const paths = data.products.map((item) => ({
    params: {
      pid: item.id,
    },
  }));
  return {
    paths,
    fallback: true,
  };
}

export async function getStaticProps({ params: { pid } }) {
  const data = await getData();
  const product = data.products.find((p) => p.id === pid);

  if (!product)
    return {
      notFound: true,
    };
  return {
    props: {
      product,
    },
  };
}
