import CustomPopup from "../CustomPopup";
import Table from "../Table";
import Image from "next/image";

const SearchTable = ({ user, totalScore, deleteScore, totalMerit }) => (
  <li key={user.id} className="grid grid-cols-6 mt-6">
    <h1 className="allCenter">{user.grade}</h1>
    <div className="w-12 h-12 rounded-full overflow-hidden justify-self-center">
      <Image
        width={48}
        height={48}
        src={user.avatar}
        alt="Profile Img"
        className="min-w-full max-w-full"
      />
    </div>
    <h1 className="allCenter">{user.username}</h1>
    <span className="allCenter">{totalScore}</span>
    <span className="allCenter">{totalMerit}</span>
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
            <h1 className="p-5">Nothing Here</h1>
          )}
        </>
      }
    />
  </li>
);

export default SearchTable;
