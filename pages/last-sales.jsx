import { useEffect, useState } from "react";
import useSWR from "swr";
// useSWR(<request-url>, (url) => fetch(url).then(res => res.json()))
export default function LastSalesPage(props) {
  const [sales, setSales] = useState(props.sales);
  //   const [loading, setLoading] = useState(false);
  const { data, error } = useSWR(
    "https://react-getting-started-48585-default-rtdb.asia-southeast1.firebasedatabase.app/sales.json",
    (url) => fetch(url).then((res) => res.json())
  );

  useEffect(() => {
    setSales(
      Object.keys(data ?? {}).map((item) => ({ id: item, ...data[item] }))
    );
  }, [data]);
  //   useEffect(async () => {
  //     async function getData() {
  //       setLoading(true);
  //       const response = await fetch(
  //         "https://react-getting-started-48585-default-rtdb.asia-southeast1.firebasedatabase.app/sales.json"
  //       );
  //       const data = await response.json();
  //       setSales(
  //         Object.keys(data ?? {}).map((item) => ({ id: item, ...data[item] }))
  //       );
  //       setLoading(false);
  //     }

  //     await getData();
  //   }, []);
  if (error) return <p>Failed to load</p>;
  if (!data && !sales) return <p>Loading...</p>;

  return (
    <ul>
      {sales.map((s) => (
        <li key={s.id}>
          {s.username} - ${s.volume}
        </li>
      ))}
    </ul>
  );
}

export async function getStaticProps() {
  const response = await fetch(
    "https://react-getting-started-48585-default-rtdb.asia-southeast1.firebasedatabase.app/sales.json"
  );
  const data = await response.json();
  const sales = Object.keys(data ?? {}).map((item) => ({
    id: item,
    ...data[item],
  }));
  return {
    props: {
      sales,
    },
  };
}
