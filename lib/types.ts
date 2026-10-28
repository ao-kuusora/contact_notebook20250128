import type { EntryType } from "@/lib/validate";

export type { EntryType };

/** API が返す投稿 (Entry) の形。日付は JSON なので文字列。 */
export type EntryDTO = {
  id: string;
  type: EntryType;
  content: string;
  dueDate: string | null;
  done: boolean;
  userId: string;
  createdAt: string;
  /** 自分が書いた投稿か */
  isMine: boolean;
  /** 自分が読んだか (自分の投稿は常に true) */
  isRead: boolean;
  authorName: string;
  authorIconUrl?: string | null;
  user?: { displayName: string; iconUrl?: string | null };
};

export type CoupleMemberDTO = {
  id: string;
  displayName: string;
  iconUrl: string | null;
};

export type UserDTO = {
  id: string;
  email: string;
  displayName: string;
  iconUrl: string | null;
  coupleId: string | null;
  couple?: {
    id: string;
    inviteCode: string;
    users: CoupleMemberDTO[];
  } | null;
};

export type UnreadDTO = {
  chores: boolean;
  errands: boolean;
  workload: boolean;
  diary: boolean;
};

export type DashboardDTO = {
  user: UserDTO | null;
  unread: UnreadDTO;
  latestChore: EntryDTO | null;
  urgentErrand: EntryDTO | null;
  todayWorkload: EntryDTO | null;
  latestDiary: EntryDTO | null;
  latestTask: EntryDTO | null;
  latestHealth: EntryDTO | null;
};
