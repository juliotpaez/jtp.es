import { ActionTree, GetterTree, MutationTree } from "vuex";

export const state = () => ({
    theme: "color"
});

// Type
export type GlobalState = ReturnType<typeof state>

export const getters: GetterTree<GlobalState, GlobalState> = {
    theme: state => state.theme
};

export const mutations: MutationTree<GlobalState> = {
    changeTheme: (state, newTheme: string) => {
        switch (newTheme) {
            case "color":
            case "white":
            case "dark":
                state.theme = newTheme;
                return;
        }

        throw `The specified theme is incorrect: ${newTheme}`;
    }
};

export const actions: ActionTree<GlobalState, GlobalState> = {};
