<template>
    <div class="intro-view theme-color">
        <div class="background-container">
            <transition @after-enter="afterBackgroundAppear" name="background-change">
                <div class="background-effect" v-if="showBackground">
                    <div class="background">
                        <div class="left"></div>
                        <div class="right"></div>
                    </div>
                </div>
            </transition>
        </div>
        <transition @after-enter="afterIconAppear" name="icon-appear">
            <div @mouseenter="showMe = true" @mouseleave="showMe = false" class="icon-box" v-show="showIcon">
                <transition mode="out-in" name="me-animation">
                    <div class="icon-me" key="me" v-if="showMe"></div>
                    <div class="icon" key="icon" v-else></div>
                </transition>
            </div>
        </transition>
        <transition @after-enter="afterBoxAppear" name="box-appear">
            <div class="box" v-if="showBox">
                <div class="box-content">
                    <div class="title">
                        <span>{{$t("title")}}</span>
                    </div>
                    <div class="message">{{$t("constructionMessage")}}</div>
                    <div class="message">{{$t("message")}}</div>
                    <div class="buttons">
                        <j-button :focus-index="0"
                                  :negative="true"
                                  :rounded="true"
                                  @click="navigateLinkedIn"
                                  bg-color="j-extra-2"
                                  color="j-complementary"
                                  left-icon="fab linkedin"/>
                        <j-button :focus-index="1"
                                  :negative="true"
                                  :rounded="true"
                                  @click="navigateGithub"
                                  bg-color="j-extra-2"
                                  color="j-complementary"
                                  left-icon="fab github"/>
                    </div>
                    <div class="lang">
                        <j-switch :rounded="true"
                                  :tricolor="true"
                                  false-color="j-extra-2"
                                  true-color="j-extra-2"
                                  v-model="isSpanish">
                            <template v-slot:true-icon>
                                <img alt="spanish language" src="~/assets/img/spain_flag.svg">
                            </template>
                            <template v-slot:false-icon>
                                <img alt="english language" src="~/assets/img/usa_flag.svg">
                            </template>
                        </j-switch>
                    </div>
                </div>
            </div>
        </transition>
    </div>
</template>

<script lang="ts">
    import { Component, Vue } from "vue-property-decorator";
    import JButton from "~/components/ui/JButton.vue";
    import JSwitch from "~/components/ui/JSwitch.vue";

    @Component({
        components: {
            JSwitch,
            JButton
        }
    })
    export default class IntroView extends Vue {
        // Animation
        showIcon = false;
        showBackground = false;
        showBox = false;

        // Values
        showMe = false;

        // GETTERS & SETTERS --------------------------------------------------

        // METHODS ------------------------------------------------------------

        get isSpanish() {
            return this.$i18n.locale === "es";
        }

        set isSpanish(value: boolean) {
            if (value === this.isSpanish) {
                return;
            }

            if (value) {
                // @ts-ignore
                this.$nuxt.$i18n.setLocale("es");
            } else {
                // @ts-ignore
                this.$nuxt.$i18n.setLocale("en");
            }
        }

        afterIconAppear() {
            this.showBackground = true;
        }

        afterBackgroundAppear() {
            this.$store.commit("changeTheme", "color");
            this.showBox = true;
        }

        afterBoxAppear() {
            this.showBackground = false;
        }

        navigateLinkedIn() {
            window.open("https://www.linkedin.com/in/julio-treviño-páez/");
        }

        navigateGithub() {
            window.open("https://github.com/juliotpaez");
        }

        // WATCHERS -----------------------------------------------------------

        // HOOKS --------------------------------------------------------------

        mounted() {
            setTimeout(() => {
                this.showIcon = true;
            }, 500);
        }
    }
</script>

<style lang="scss" scoped>
    .intro-view {
        align-items: center;
        display: flex;
        flex-direction: column;
        height: 100%;
        justify-content: center;
        width: 100%;
    }

    .background-container {
        align-items: center;
        bottom: 0;
        display: flex;
        justify-content: center;
        left: 0;
        overflow: hidden;
        position: absolute;
        right: 0;
        top: 0;
    }

    .background-effect {
        align-items: center;
        border-radius: 100vmax;
        display: flex;
        height: 200px;
        justify-content: center;
        overflow: hidden;
        width: 200px;
    }

    .background {
        background: var(--bg-gradient-top);
        height: 100vh;
        width: 100vw;
    }

    .background .left {
        background: var(--bg-gradient-left);
        height: 100vmax;
        left: -100vmax;
        rotate: 15deg;
        top: 30vh;
        width: 200vmax;
    }

    .background .right {
        background: var(--bg-gradient-right);
        height: 100vmax;
        position: absolute;
        right: -100vmax;
        rotate: -20deg;
        top: 50vh;
        width: 200vmax;
    }

    .icon-box {
        align-items: center;
        background-color: #ffffff;
        border-radius: 30vmin;
        box-shadow: 0 10px 30px rgba(0, 0, 0, .1), 0 1px 8px rgba(0, 0, 0, .2);
        display: flex;
        height: 30vmin;
        justify-content: center;
        width: 30vmin;
    }

    .icon {
        background: url("~assets/img/jtp_big_icon.svg") no-repeat center;
        background-size: contain;
        height: 80%;
        width: 80%;
    }

    .icon-me {
        background: url("~assets/img/me.png") no-repeat center;
        background-size: contain;
        border-radius: 200px;
        height: 80%;
        width: 80%;
    }

    .box {
        background-color: #ffffff;
        border-radius: 20px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, .1), 0 1px 8px rgba(0, 0, 0, .2);
        margin-top: 30px;
        max-height: 100vh;
        max-width: 500px;
        min-width: var(--min-width);
        overflow: hidden;
        padding: 15px;
    }

    .box-content {
        opacity: 1;

        .title {
            font-size: 1.2em;
            font-weight: bold;
            margin-bottom: 12px;
            text-align: center;
            white-space: pre-wrap;
        }

        .message {
            margin-bottom: 12px;
            text-align: center;
            white-space: pre-wrap;
        }

        .buttons {
            align-items: center;
            display: flex;
            font-size: 2em;
            justify-content: space-around;
        }
    }

    .lang {
        font-size: 0.8em;
        position: absolute;
        right: 0;
        top: 0;

        img {
            max-height: 1.2em;
            max-width: 2em;
        }
    }

    /*  ==============  */
    /*  Icon animation  */
    /*  ==============  */
    .icon-appear-enter-active {
        animation: icon-in 1s;
    }

    @keyframes icon-in {
        0% {
            transform: scale(0);
        }
        80% {
            transform: scale(1);
        }
        90% {
            transform: scale(1.1);
        }
        100% {
            transform: scale(1);
        }
    }

    /*  ====================  */
    /*  Background animation  */
    /*  ====================  */
    .background-change-enter-active {
        transition: all 1.5s ease;
    }

    .background-change-enter {
        height: 20px;
        width: 20px;
    }

    .background-change-enter-to {
        height: 200vmax;
        width: 200vmax;
    }

    /*  =============  */
    /*  Box animation  */
    /*  =============  */
    .box-appear-enter-active {
        animation: box-in 2s ease;

        & > .box-content {
            transition: opacity 1s ease 1.5s;
        }
    }

    .box-appear-enter .box-content {
        opacity: 0;
    }

    .box-appear-enter-to .box-content {
        opacity: 1;
    }

    @keyframes box-in {
        0% {
            max-width: 0;
            max-height: 0;
            padding: 0;
            margin-top: 0;
        }
        40% {
            max-height: 0;
        }
        50% {
            max-width: 500px;
            margin-top: 30px;
            padding: 10px;
        }
        100% {
            max-height: 50vh;
        }
    }

    /*  ============  */
    /*  My animation  */
    /*  ============  */
    .me-animation-enter-active,
    .me-animation-leave-active {
        transition: transform 0.2s ease;
    }

    .me-animation-leave {
        transform: rotateY(0);
    }

    .me-animation-leave-to {
        transform: rotateY(90deg);
    }

    .me-animation-enter {
        transform: rotateY(90deg);
    }

    .me-animation-enter-to {
        transform: rotateY(0);
    }
</style>

<i18n>
    {
        "en": {
            "title": "Welcome to jtp.es!",
            "constructionMessage": "My name is Julio Treviño Páez and I'm currently building this web so...\nThis page is under construction!!",
            "message": "Meanwhile you can discover everything about me in other platforms:"
        },
        "es": {
            "title": "¡Bienvenido a jtp.es!",
            "constructionMessage": "Me llamo Julio Treviño Páez y estoy desarrollando la web así que...\n¡¡Esta pagína está en construcción!!",
            "message": "Mientras tanto puedes descubrir toda la información acerca de mi en otras plataformas:"
        }
    }
</i18n>
