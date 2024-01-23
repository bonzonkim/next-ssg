import { getSortedPostsData, PostsData } from '../lib/posts';

interface HomeProps {
  allPostsData:  PostsData[];
}

export async function getStaticProps () {
  const allPostsData = getSortedPostsData();

  return {
    props: {
      allPostsData
    }
  }
}

const Home: React.FC<HomeProps> = ({ allPostsData }) => {
  return (
    <>
      <section>
        <ul>
          {allPostsData.map(({ id, date, title, content}) => (
            <li key={id}>
              <h1>id: {id}</h1>
              <br/>
              <h1>title: {title}</h1>
              <br/>
              <h1>content: {content}</h1>
              <br/>
              <h1>date: {date}</h1>
              <br/>
            </li>
          ))}
        </ul>
      </section>
    </>
  )
}

export default Home;
