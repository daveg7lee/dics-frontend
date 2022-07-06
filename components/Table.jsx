import styled from 'styled-components';

const STable = styled.table`
  width: 100%;
  border-collapse: separate;
  border-spacing: 0 20px;
  padding: 1rem;
`;

const Th = styled.th``;

const Td = styled.td`
  text-align: center;
`;

const Delete = styled.h1`
  cursor: pointer;
  background-color: ${(props) => props.theme.blueColor};
  padding: 8px 3px;
  border-radius: 4px;
  color: white;
`;

const Table = ({ scores, deleteScore, Admin }) => {
  return (
    <STable>
      <thead>
        <tr>
          <Th>Score</Th>
          <Th>Article</Th>
          <Th>Date</Th>
          <Th>Uploader</Th>
          <Th>Detail</Th>
          {Admin && <Th>Delete</Th>}
        </tr>
      </thead>
      {scores.map((score) => (
        <tr key={score.id} style={{ marginTop: '0.5rem' }}>
          <Td>{score.type === 'Demerit' ? score.score * -1 : score.score}</Td>
          <Td>{score.article}</Td>
          <Td>{score.date.replace(/T.*/, '').split('-').join('-')}</Td>
          <Td>{score.uploader}</Td>
          <Td>{score.detail}</Td>
          {Admin && (
            <Td onClick={deleteScore}>
              <Delete id={score.id}>Delete</Delete>
            </Td>
          )}
        </tr>
      ))}
    </STable>
  );
};

export default Table;
