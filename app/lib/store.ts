import dayjs from 'dayjs'
import { create } from 'zustand'

type State = {
    branchId: number
    companyId: number
    startDate: string
    endDate: string
}

type Action = {
    updateBranchId: (branchId: State['branchId']) => void
    updateStartDate: (startDate: State['startDate']) => void
    updateEndDate: (endDate: State['endDate']) => void
}

const now = dayjs();



// Create your store, which includes both state and (optionally) actions
export const useAppStore = create<State & Action>((set) => ({
    branchId: 0,
    companyId: 0,
    startDate: dayjs().subtract(30, "day").format("YYYY-MM-DD"),
    endDate: now.format('YYYY-MM-DD'),
    updateBranchId: (branchId) => set(() => ({ branchId: branchId })),
    updateStartDate: (startDate) => set(() => ({ startDate: startDate })),
    updateEndDate: (endDate) => set(() => ({ endDate: endDate })),
}));
