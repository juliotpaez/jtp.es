import { ActionTree, GetterTree, MutationTree } from "vuex";

export const state = () => ({
    theme: "white"
});

// Type
export type GlobalState = ReturnType<typeof state>

export const getters: GetterTree<GlobalState, GlobalState> = {};

export const mutations: MutationTree<GlobalState> = {
    changeTheme: (state, newTheme: string) => {
        switch (newTheme) {
            case "color":
            case "dark":
                state.theme = newTheme;
                return;
        }

        console.warn(`The specified theme is incorrect: ${newTheme}`);
    }
};

export const actions: ActionTree<GlobalState, GlobalState> = {};
