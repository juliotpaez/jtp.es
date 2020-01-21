import { Vue } from "~/node_modules/vue-property-decorator";

Vue.directive("focus", {
    inserted: function (el, binding) {
        if (!binding.value) {
            return;
        }

        const tab = binding.modifiers.tab || binding.value.tab || false;
        if (tab) {
            el.setAttribute("tabindex", "-1");
        }

        el.focus();
    }
});


// Resize directive.
const resizeState = new Map<HTMLElement, any>();
const resizeFn = () => {
    resizeState.forEach((resizeFn) => {
        resizeFn({
            width: window.innerWidth,
            height: window.innerHeight
        });
    });
};
Vue.directive("resize", {
    bind: function (el, binding) {
        window.addEventListener("resize", resizeFn);

        resizeState.set(el, binding.value);

        const quiet = binding.modifiers.quiet || false;
        if (!quiet) {
            binding.value({
                width: window.innerWidth,
                height: window.innerHeight
            });
        }
    },
    unbind: function (el) {
        resizeState.delete(el);
    }
});
