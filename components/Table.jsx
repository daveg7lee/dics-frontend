const Table = ({ scores, deleteScore, Admin }) => {
  return (
    <table className="w-full border-separate p-4">
      <thead>
        <tr>
          <th>Score</th>
          <th>Article</th>
          <th>Date</th>
          <th>Uploader</th>
          <th>Detail</th>
          {Admin && <th>Delete</th>}
        </tr>
      </thead>
      {scores.map((score) => (
        <tr key={score.id} style={{ marginTop: "0.5rem" }}>
          <td className="text-center">
            {score.type === "Demerit" ? score.score * -1 : score.score}
          </td>
          <td className="text-center">{score.article}</td>
          <td className="text-center">
            {score.date.replace(/T.*/, "").split("-").join("-")}
          </td>
          <td className="text-center">{score.uploader}</td>
          <td className="text-center">{score.detail}</td>
          {Admin && (
            <td className="text-center" onClick={deleteScore}>
              <h1
                className="cursor-pointer bg-blueColor py-2 px-1"
                id={score.id}
              >
                Delete
              </h1>
            </td>
          )}
        </tr>
      ))}
    </table>
  );
};

export default Table;
