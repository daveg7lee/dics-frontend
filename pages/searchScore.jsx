import { useQuery } from "@apollo/client";
import gql from "graphql-tag";
import { useForm } from "react-hook-form";
import Loading from "../components/Loading";

const SEARCH_SCORE = gql`
  query searchScore($term: String!) {
    searchScore(term: $term) {
      scores {
        id
        uploader
        date
        score
        article
        user {
          username
        }
      }
      success
    }
  }
`;

const SearchScore = () => {
  const { register, watch } = useForm();
  const { data, loading } = useQuery(SEARCH_SCORE, {
    variables: { term: watch("term") ? watch("term") : "" },
  });

  const dateOnChange = (e) => {
    const {
      target: { value },
    } = e;
    e.preventDefault();
    const searchScore = data.searchScore.filter((score) =>
      score.date.includes(value)
    );
    setShowData({ searchScore });
  };

  return (
    <div className="min-h-screen px-5 pt-20">
      <header className="w-full flex flex-col justify-center items-center h-32">
        <input
          placeholder="Uploader Name"
          className="input"
          {...register("term")}
        />
        <input type="month" onChange={dateOnChange} className="input" />
      </header>
      {loading ? (
        <Loading />
      ) : (
        <>
          <h1 className="text-xl font-semibold">검색 결과</h1>
          <ul className="my-20">
            {data?.searchScore.scores.map((score) => (
              <li className="w-full flex justify-between mb-5" key={score.id}>
                <h1 className="text-center w-full">{score.uploader}</h1>
                <h1 className="text-center w-full">{score.user.username}</h1>
                <h2 className="text-center w-full">{score.article}</h2>
                <span className="text-center w-full">{score.date}</span>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

export default SearchScore;
