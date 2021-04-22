import CustomPopup from './CustomPopup';
import Table from './Table';

const SearchTable = ({ user, totalScore, deleteScore }) => (
  <li key={user.id} className="grid grid-cols-4 mt-6">
    <div className="w-12 h-12 rounded-full overflow-hidden justify-self-center">
      <img
        src={user.avatar}
        alt="Profile Img"
        className="min-w-full max-w-full"
      />
    </div>
    <h1 className="allCenter">{user.username}</h1>
    <span className="allCenter">{totalScore}</span>
    <CustomPopup
      contents={
        <>
          {user.scores.length >= 1 ? (
            <Table
              scores={user.scores}
              deleteScore={deleteScore}
              Admin={true}
            />
          ) : (
            <h1>Nothing Here</h1>
          )}
        </>
      }
    />
  </li>
);

export default SearchTable;
