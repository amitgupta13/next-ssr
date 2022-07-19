export default function UserIdPage(props) {
  return <h1>{props.id}</h1>;
}

export async function getServerSideProps(context) {
  const {
    params: { uid },
  } = context;
  return {
    props: {
      id: `Userid-${uid}`,
    },
  };
}
