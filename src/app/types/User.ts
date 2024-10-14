
export type User = {
    id: string; // Supabase에서 자동으로 생성되는 기본 키(ID)를 추가해줄 수 있습니다.
    user_name: string | null; // user_name 필드가 있을 경우 nullable 처리를 해줄 수 있습니다.
    profile_img: string | null; // 프로필 이미지 URL이 없을 수 있으므로 null을 허용합니다.
    created_at: string; // `timestamptz`는 문자열로 처리됩니다.
    updated_at: string; // `timestamptz`는 문자열로 처리됩니다.
    email: string; // 사용자 이메일은 기본적으로 문자열입니다.
    nickname: string; // 닉네임이 null일 수 있다면 이를 처리합니다.
  };
  