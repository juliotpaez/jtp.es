import { ActionTree, GetterTree, MutationTree } from "vuex";

export const state = () => ({
    things: [] as string[],
    name: "Me"
});

// Type
export type RootState = ReturnType<typeof state>

export const getters: GetterTree<RootState, RootState> = {
    name: state => state.name
};

export const mutations: MutationTree<RootState> = {
    CHANGE_NAME: (state, newName: string) => (state.name = newName)
};

export const actions: ActionTree<RootState, RootState> = {
    fetchThings({commit}) {
        commit("CHANGE_NAME", "New name");
    }
};
