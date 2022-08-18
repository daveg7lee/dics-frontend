import { toast } from "react-toastify";
import { useMutation } from "@apollo/client";
import gql from "graphql-tag";
import Link from "next/link";

const RESET_SCORE = gql`
  mutation resetScores {
    resetScores {
      success
      error
    }
  }
`;

const Admin = () => {
  const [resetScoresMutation] = useMutation(RESET_SCORE);

  const resetScores = async () => {
    alert(
      "한번 점수를 초기화하면 다시 되돌릴 수 없습니다. 정말 초기화 하시겠습니까?"
    );
    const ok = prompt("'삭제'를 입력해주세요", "");
    if (ok === "삭제") {
      const {
        data: {
          resetScores: { success },
        },
      } = await resetScoresMutation();
      if (success) {
        toast.success("모든 점수가 초기화되었습니다.");
      } else {
        toast.error(
          "점수 초기화에 실패하였습니다. 잠시후 다시 시도하거나 관리자에게 문의해주시길 바랍니다."
        );
      }
    }
  };

  return (
    <div className="flex flex-col justify-center items-center">
      <div className="md:flex items-center w-full">
        <Link href="/upload">
          <a className="text-2xl font-semibold md:w-fit w-full">
            <div className="border border-borderColor p-5 rounded md:mr-5 mb-3">
              상벌점 입력
            </div>
          </a>
        </Link>
        <Link href="/searchUser">
          <a className="text-2xl font-semibold md:w-fit w-full">
            <div className="border border-borderColor p-5 rounded md:mr-5 mb-3">
              학생 조회
            </div>
          </a>
        </Link>
        <Link href="/signup">
          <a className="text-2xl font-semibold md:w-fit w-full">
            <div className="border border-borderColor p-5 rounded md:mr-5 mb-3">
              학생 추가
            </div>
          </a>
        </Link>
        <Link href="/deleteUser">
          <a className="text-2xl font-semibold md:w-fit w-full">
            <div className="border border-borderColor p-5 rounded md:mr-5 mb-3">
              학생 제거
            </div>
          </a>
        </Link>
        <Link href="/searchScore">
          <a className="text-2xl font-semibold md:w-fit w-full">
            <div className="border border-borderColor p-5 rounded md:mr-5 mb-3">
              상벌점 조회
            </div>
          </a>
        </Link>
        <button
          className="text-2xl font-semibold md:w-fit w-full text-left"
          onClick={resetScores}
        >
          <div className="border border-borderColor p-5 rounded md:mr-5 mb-3">
            점수 전체 초기화
          </div>
        </button>
      </div>
    </div>
  );
};

export default Admin;
