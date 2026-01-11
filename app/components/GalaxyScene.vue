<script setup lang="ts">
import * as THREE from "three";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import vertexShader from "./shaders/vertex.glsl?raw";
import fragmentShader from "./shaders/fragment.glsl?raw";

const bufferRef = shallowRef(null);

const params = {
    count: 15000,
    size: 30,
    radius: 2,
    branches: 20,
    randomness: 0.5,
    randomnessPower: 5,
};

const positions = new Float32Array(params.count * 3);
const colors = new Float32Array(params.count * 3);
const scales = new Float32Array(params.count);
const randomnessArray = new Float32Array(params.count * 3);
gsap.registerPlugin(ScrollTrigger);

const generateGalaxy = () => {
    const colorCore = new THREE.Color("#fff6d5");
    const colorInside = new THREE.Color("#ffd27d");
    const colorOutside = new THREE.Color("#8faad9");

    const tempColor = new THREE.Color();

    const nebulaColors = [
        new THREE.Color("#b48cff"),
        new THREE.Color("#d48cff"),
        new THREE.Color("#7fa6ff"),
        new THREE.Color("#ff9fb3"),
        new THREE.Color("#6b7fd7"),
        new THREE.Color("#ffd6a5"),
    ];

    for (let i = 0; i < params.count; i++) {
        const i3 = i * 3;
        const radius = Math.random() * params.radius;
        const branchAngle =
            ((i % params.branches) * Math.PI * 2) / params.branches;

        positions[i3] = Math.cos(branchAngle) * radius;
        positions[i3 + 1] = 0;
        positions[i3 + 2] = Math.sin(branchAngle) * radius;

        randomnessArray[i3] =
            Math.pow(Math.random(), params.randomnessPower) *
            (Math.random() < 0.5 ? 1 : -1) *
            params.randomness *
            radius;
        randomnessArray[i3 + 1] =
            Math.pow(Math.random(), params.randomnessPower) *
            (Math.random() < 0.5 ? 1 : -1) *
            params.randomness *
            (radius * 0.5);
        randomnessArray[i3 + 2] =
            Math.pow(Math.random(), params.randomnessPower) *
            (Math.random() < 0.5 ? 1 : -1) *
            params.randomness *
            radius;

        const ratio = radius / params.radius;

        if (ratio < 0.2) {
            tempColor.copy(colorCore).lerp(colorInside, ratio * 5);
        } else {
            tempColor
                .copy(colorInside)
                .lerp(colorOutside, (ratio - 0.2) * 1.25);
        }

        const nebulaSeed = Math.sin(i * 0.1) * 0.5 + 0.5;
        if (nebulaSeed > 0.8 && radius > 2) {
            const nebulaColor = nebulaColors[i % nebulaColors.length];
            tempColor.lerp(nebulaColor, 0.4 * ratio);
        }

        const noise = Math.random() * 0.2;
        colors[i3] = tempColor.r + noise;
        colors[i3 + 1] = tempColor.g + noise;
        colors[i3 + 2] = tempColor.b + noise;

        scales[i] = Math.random();
    }
};

generateGalaxy();

const shader = {
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    vertexColors: true,
    vertexShader,
    fragmentShader,
    uniforms: {
        uTime: { value: 0 },
        uSize: { value: params.size },
    },
};

onMounted(() => {
    if (bufferRef.value) {
        gsap.to(bufferRef.value.position, {
            z: 1,
            y: 1,
            ease: "none",
            scrollTrigger: {
                trigger: "body",
                start: "top top",
                end: "bottom bottom",
                scrub: 1,
            },
        });

        gsap.to(bufferRef.value.rotation, {
            y: -1,
            scrollTrigger: {
                trigger: "body",
                start: "top top",
                end: "bottom bottom",
                scrub: 2,
            },
        });
    }
});

const { onBeforeRender } = useLoop();
let lastUpdate = 0;
const targetFPS = 24;

onBeforeRender(({ elapsed }) => {
    if (elapsed - lastUpdate >= 1 / targetFPS) {
        if (bufferRef.value) {
            bufferRef.value.material.uniforms.uTime.value = elapsed;
        }
        lastUpdate = elapsed;
    }
});

onBeforeUnmount(() => {
    if (bufferRef.value) {
        bufferRef.value.geometry.dispose();
        bufferRef.value.material.dispose();
    }
});
</script>

<template>
    <TresPoints ref="bufferRef">
        <TresBufferGeometry
            :position="[positions, 3]"
            :a-scale="[scales, 1]"
            :color="[colors, 3]"
            :a-randomness="[randomnessArray, 3]"
        />
        <TresShaderMaterial v-bind="shader" />
    </TresPoints>
</template>
