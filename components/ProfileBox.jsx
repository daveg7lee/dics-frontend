import Admin from "./Admin";
import CustomPopup from "./CustomPopup";
import Table from "./Table";

const ProfileBox = ({ me }) => (
  <>
    <div className="h-full w-full layout flex justify-center items-center py-20">
      {me.type === "Admin" ? (
        <Admin />
      ) : (
        <div className="w-full flex flex-col justify-center items-center">
          <div className="flex justify-center items-center py-20">
            <div className="flex flex-col justify-center items-center mr-20">
              <h1 className="md:text-[15rem] md:leading-[15rem] text-9xl font-semibold">
                {me?.totalScores}
              </h1>
              <p className="text-xl font-medium">벌점</p>
            </div>
            <div className="flex flex-col justify-center items-center">
              <h1 className="md:text-[15rem] md:leading-[15rem] text-9xl font-semibold">
                {me?.totalMerit}
              </h1>
              <p className="text-xl font-medium">상점</p>
            </div>
          </div>
          <div className="grid grid-cols-2 w-full gap-5">
            {me?.scores.map((score) => (
              <div
                key={score.id}
                className={`cursor-pointer p-8 rounded-lg w-full text-white ${
                  score.type === "Demerit" ? "bg-red-400" : "bg-green-400"
                }`}
              >
                <h1>
                  {score.type === "Demerit" ? "벌점" : "상점"} {score.score}점
                </h1>
                <h2>{score.article}</h2>
                <div className="flex justify-between items-center">
                  <span>
                    {score.date.replace(/T.*/, "").split("-").join(".")}
                  </span>
                  <p>{score.uploader}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  </>
);

export default ProfileBox;
