import { useQuery } from "@apollo/client";
import gql from "graphql-tag";
import { useState } from "react";
import Loading from "../Components/Loading";
import useInput from "../Hooks/useInput";

const SEARCH_SCORE = gql`
  query searchScore($term: String!) {
    searchScore(term: $term) {
      id
      uploader
      date
      score
      article
      user {
        username
      }
    }
  }
`;

const SearchScore = () => {
  const term = useInput("");
  let { data, loading, refetch } = useQuery(SEARCH_SCORE, {
    variables: { term: term.value },
  });
  const [showData, setShowData] = useState(data);
  const onChange = (e) => {
    term.onChange(e);
    e.preventDefault();
    refetch();
    setShowData(data);
  };
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
    <div className="min-h-screen">
      <header className="w-full flex flex-col justify-center items-center h-32">
        <input
          placeholder="Uploader Name"
          value={term.value}
          onChange={onChange}
          className="input"
        />
        <input type="month" onChange={dateOnChange} className="input" />
      </header>
      {loading ? (
        <Loading />
      ) : (
        <>
          <h1 className="text-xl font-semibold">검색 결과</h1>
          <ul className="mb-20">
            {showData?.searchScore.map((score) => (
              <li className="w-full flex justify-between" key={score.id}>
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
