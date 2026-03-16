export type Diary = {
    id: string;
    content: string;
    createdAt: string;
    contentByAi?: string | null;
    themeColor?: string | null;
    aiPrompt?: string | null;
}