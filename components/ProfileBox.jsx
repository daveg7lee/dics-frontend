import Admin from "./Admin";
import CustomPopup from "./CustomPopup";
import Table from "./Table";

const ProfileBox = ({ me }) => (
  <>
    <div className="h-full w-full flex justify-center items-center">
      {me.type === "Admin" ? (
        <Admin />
      ) : (
        <div className="w-full flex flex-col justify-center items-center">
          <div className="flex justify-center items-center mb-12">
            <div className="flex flex-col justify-center items-center mr-20">
              <h1 className="text-[15rem] leading-[15rem] font-semibold">
                {me?.totalScores}
              </h1>
              <p className="text-xl font-medium">벌점</p>
            </div>
            <div className="flex flex-col justify-center items-center">
              <h1 className="text-[15rem] leading-[15rem] font-semibold">
                {me?.totalMerit}
              </h1>
              <p className="text-xl font-medium">상점</p>
            </div>
          </div>
          <CustomPopup
            contents={
              <>
                {me?.scores.length >= 1 ? (
                  <Table scores={me?.scores} />
                ) : (
                  <h1>Nothing Here</h1>
                )}
              </>
            }
          />
        </div>
      )}
    </div>
  </>
);

export default ProfileBox;
