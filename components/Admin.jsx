import { toast } from "react-toastify";
import { useMutation } from "@apollo/client";
import gql from "graphql-tag";
import Link from "next/link";
import { purgeAllUsers } from "../apollo";

const RESET_SCORE = gql`
  mutation resetScores($type: ScoreType!) {
    resetScores(type: $type) {
      success
      error
    }
  }
`;

const GRADUATE = gql`
  mutation graduate {
    graduate {
      success
      error
    }
  }
`;

const Admin = () => {
  const [resetScoresMutation] = useMutation(RESET_SCORE);
  const [graduateMutation] = useMutation(GRADUATE);

  const resetScores = async (type) => {
    alert(
      "한번 점수를 초기화하면 다시 되돌릴 수 없습니다. 정말 초기화 하시겠습니까?"
    );
    const ok = prompt("'삭제'를 입력해주세요", "");
    if (ok === "삭제") {
      const {
        data: {
          resetScores: { success },
        },
      } = await resetScoresMutation({ variables: { type } });
      await purgeAllUsers();
      if (success) {
        toast.success("모든 점수가 초기화되었습니다.");
      } else {
        toast.error(
          "점수 초기화에 실패하였습니다. 잠시후 다시 시도하거나 관리자에게 문의해주시길 바랍니다."
        );
      }
    }
  };

  const onClickGraduate = async () => {
    alert(
      "정말로 모든 학생들의 학년을 변경하시겠습니까? 참고로 이 작업은 절대 되돌릴 수 없습니다."
    );
    const ok = prompt("'변경'를 입력해주세요", "");
    if (ok === "변경") {
      const {
        data: {
          graduate: { success },
        },
      } = await graduateMutation();
      await purgeAllUsers();
      if (success) {
        toast.success("모든 학년이 변경되었습니다.");
      } else {
        toast.error(
          "졸업에 실패하였습니다. 잠시후 다시 시도하거나 관리자에게 문의해주시길 바랍니다."
        );
      }
    }
  };

  return (
    <div className="flex flex-col justify-center items-center w-full">
      <div className="w-full grid grid-cols-6 gap-4">
        <Link href="/upload">
          <a className="text-2xl font-semibold w-full">
            <div className="border border-borderColor p-5 rounded text-center h-full">
              상벌점 입력
            </div>
          </a>
        </Link>
        <Link href="/searchUser">
          <a className="text-2xl font-semibold w-full">
            <div className="border border-borderColor p-5 rounded text-center h-full">
              학생 조회
            </div>
          </a>
        </Link>
        <Link href="/signup">
          <a className="text-2xl font-semibold w-full">
            <div className="border border-borderColor p-5 rounded text-center h-full">
              학생 추가
            </div>
          </a>
        </Link>
        <Link href="/deleteUser">
          <a className="text-2xl font-semibold w-full">
            <div className="border border-borderColor p-5 rounded text-center h-full">
              학생 제거
            </div>
          </a>
        </Link>
        <Link href="/searchScore">
          <a className="text-2xl font-semibold w-full">
            <div className="border border-borderColor p-5 rounded text-center h-full">
              상벌점 조회
            </div>
          </a>
        </Link>
        <button
          className="text-2xl font-semibold w-full text-center h-full"
          onClick={() => resetScores("Demerit")}
        >
          <div className="border border-borderColor p-5 rounded">
            벌점 초기화
          </div>
        </button>
        <button
          className="text-2xl font-semibold w-full text-center h-full"
          onClick={() => resetScores("Merit")}
        >
          <div className="border border-borderColor p-5 rounded">
            상점 초기화
          </div>
        </button>
        <button
          className="text-2xl font-semibold w-full text-center h-full"
          onClick={onClickGraduate}
        >
          <div className="border border-borderColor p-5 rounded">졸업</div>
        </button>
        <Link href="/admin/suggest">
          <a className="text-2xl font-semibold w-full">
            <div className="border border-borderColor p-5 rounded text-center h-full">
              소리함 관리
            </div>
          </a>
        </Link>
        <Link href="/admin/gallery">
          <a className="text-2xl font-semibold w-full">
            <div className="border border-borderColor p-5 rounded text-center h-full">
              갤러리 관리
            </div>
          </a>
        </Link>
      </div>
    </div>
  );
};

export default Admin;
