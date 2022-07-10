import CustomPopup from "./CustomPopup";
import Table from "./Table";

const ProfileBox = ({ me }) => (
  <div className="h-fit w-full rounded-2xl flex justify-center items-center p-4">
    {me.type === "Admin" ? (
      <h1 className="text-8xl font-bold text-center">Welcome Admin!!</h1>
    ) : (
      <div className="w-full flex flex-col justify-center items-center">
        <div className="flex justify-center items-center mb-10">
          <div className="flex flex-col justify-center items-center mr-20">
            <h1 className="text-6xl font-bold">{me?.totalScores}</h1>
            <p className="text-2xl font-medium">벌점</p>
          </div>
          <div className="flex flex-col justify-center items-center">
            <h1 className="text-6xl font-bold">{me?.totalMerit}</h1>
            <p className="text-2xl font-medium">상점</p>
          </div>
        </div>
        <div className="flex justify-center items-center">
          <h1 className="mr-5 text-2xl font-semibold">
            {me.totalMerit - me.totalScores <= -15
              ? "Go to Solomon"
              : me.totalMerit - me.totalScores <= -10
              ? "You are Warning"
              : "You are Safe"}
          </h1>
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
      </div>
    )}
  </div>
);

export default ProfileBox;
