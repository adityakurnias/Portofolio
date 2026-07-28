<script setup lang="ts">
import * as THREE from "three";
import { shallowRef, onMounted, onBeforeUnmount } from "vue";
import { useLoop, useTresContext } from "@tresjs/core";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const machinaGroup = shallowRef<THREE.Group | null>(null);
const ringOuter = shallowRef<THREE.Mesh | null>(null);
const ringMid = shallowRef<THREE.Mesh | null>(null);
const ringInner = shallowRef<THREE.Mesh | null>(null);
const coreRef = shallowRef<THREE.Mesh | null>(null);
const coreShellRef = shallowRef<THREE.Mesh | null>(null);
const greebleGroup = shallowRef<THREE.Group | null>(null);
const debrisRef = shallowRef<THREE.Points | null>(null);

gsap.registerPlugin(ScrollTrigger);

const { scene } = useTresContext();
scene.value.fog = new THREE.FogExp2(0x02030a, 0.015);

const speeds = {
    outer: 0.015,
    mid: -0.08,
    inner: 0.18,
    greeble: 0.03,
};

const GREEBLE_COUNT = 40;
const greebleData = Array.from({ length: GREEBLE_COUNT }, (_, i) => {
    const angle = (i / GREEBLE_COUNT) * Math.PI * 2;
    const radiusJitter = 4 + (Math.random() - 0.5) * 0.15;
    return {
        position: [
            Math.cos(angle) * radiusJitter,
            Math.sin(angle) * radiusJitter,
            (Math.random() - 0.5) * 0.4,
        ] as [number, number, number],
        rotation: [Math.random(), Math.random(), Math.random()] as [number, number, number],
        scale: 0.08 + Math.random() * 0.1,
    };
});

const DEBRIS_COUNT = 600;
const debrisPositions = new Float32Array(DEBRIS_COUNT * 3);
for (let i = 0; i < DEBRIS_COUNT; i++) {
    const i3 = i * 3;
    const r = 5 + Math.random() * 14;
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(2 * Math.random() - 1);
    debrisPositions[i3] = r * Math.sin(phi) * Math.cos(theta);
    debrisPositions[i3 + 1] = r * Math.sin(phi) * Math.sin(theta) * 0.4;
    debrisPositions[i3 + 2] = r * Math.cos(phi) - 3;
}

const { onBeforeRender } = useLoop();

let winWidth = 1920;
let winHeight = 1080;

const updateWindowDimensions = () => {
    winWidth = window.innerWidth || 1920;
    winHeight = window.innerHeight || 1080;
};

const pointer = { x: 0, y: 0 };
const handlePointerMove = (e: PointerEvent) => {
    pointer.x = (e.clientX / winWidth - 0.5) * 2;
    pointer.y = (e.clientY / winHeight - 0.5) * 2;
};

let mm: gsap.MatchMedia;
let pointerParallaxEnabled = false;
let pointerModeQuery: MediaQueryList | null = null;
let handlePointerModeChange: ((event: MediaQueryListEvent) => void) | null = null;

onBeforeRender(({ delta, elapsed }) => {
    if (ringOuter.value) {
        ringOuter.value.rotation.y += speeds.outer * delta;
        ringOuter.value.rotation.x = Math.sin(elapsed * 0.08) * 0.05;
    }
    if (greebleGroup.value) {
        greebleGroup.value.rotation.y += speeds.outer * delta;
    }
    if (ringMid.value) {
        ringMid.value.rotation.x += speeds.mid * delta;
        ringMid.value.rotation.z += speeds.mid * delta * 0.5;
    }
    if (ringInner.value) {
        ringInner.value.rotation.z += speeds.inner * delta;
        ringInner.value.rotation.y += speeds.inner * delta * 0.8;
    }
    if (coreRef.value) {
        const scale = 1 + Math.sin(elapsed * 4) * 0.05;
        coreRef.value.scale.set(scale, scale, scale);
    }
    if (coreShellRef.value) {
        coreShellRef.value.rotation.y -= delta * 0.5;
        coreShellRef.value.rotation.z += delta * 0.5;
    }
    if (debrisRef.value) {
        debrisRef.value.rotation.y += 0.008 * delta;
    }
    if (machinaGroup.value) {
        machinaGroup.value.position.y = Math.sin(elapsed * 0.4) * 0.15;
        if (pointerParallaxEnabled) {
            machinaGroup.value.rotation.y +=
                (pointer.x * 0.05 - machinaGroup.value.rotation.y * 0.02) * delta;
            machinaGroup.value.rotation.x +=
                (pointer.y * 0.03 - machinaGroup.value.rotation.x * 0.02) * delta;
        }
    }
});

onMounted(() => {
    updateWindowDimensions();
    window.addEventListener("resize", updateWindowDimensions);
    pointerModeQuery = window.matchMedia("(hover: hover) and (pointer: fine)");
    pointerParallaxEnabled = pointerModeQuery.matches;

    handlePointerModeChange = (event) => {
        pointerParallaxEnabled = event.matches;

        if (pointerParallaxEnabled) {
            window.addEventListener("pointermove", handlePointerMove);
        } else {
            window.removeEventListener("pointermove", handlePointerMove);
            pointer.x = 0;
            pointer.y = 0;
        }
    };

    pointerModeQuery.addEventListener("change", handlePointerModeChange);

    if (pointerParallaxEnabled) {
        window.addEventListener("pointermove", handlePointerMove);
    }

    if (machinaGroup.value) {
        mm = gsap.matchMedia();

        // Dekstop
        mm.add("(min-width: 768px)", () => {
            // Posisi awal
            machinaGroup.value!.position.set(4.5, 1, -2);
            machinaGroup.value!.scale.set(1.15, 1.15, 1.15);

            gsap.to(machinaGroup.value!.scale, {
                x: 1.4, y: 1.4, z: 1.4,
                scrollTrigger: { trigger: "body", start: "top top", end: "bottom bottom", scrub: 1 },
            });
            gsap.to(machinaGroup.value!.position, {
                z: -6, x: 3,
                scrollTrigger: { trigger: "body", start: "top top", end: "bottom bottom", scrub: 1 },
            });
        });

        // Mobile
        mm.add("(max-width: 767px)", () => {
            machinaGroup.value!.position.set(2, 3, -4);
            machinaGroup.value!.scale.set(0.9, 0.9, 0.9);

            gsap.to(machinaGroup.value!.scale, {
                x: 1, y: 1, z: 1,
                scrollTrigger: { trigger: "body", start: "top top", end: "bottom bottom", scrub: 1 },
            });
            gsap.to(machinaGroup.value!.position, {
                z: -8, x: 0,
                scrollTrigger: { trigger: "body", start: "top top", end: "bottom bottom", scrub: 1 },
            });
        });
    }
});

onBeforeUnmount(() => {
    window.removeEventListener("resize", updateWindowDimensions);
    window.removeEventListener("pointermove", handlePointerMove);

    if (pointerModeQuery && handlePointerModeChange) {
        pointerModeQuery.removeEventListener("change", handlePointerModeChange);
    }

    scene.value.fog = null;

    if (mm) mm.revert();
});
</script>

<template>
    <TresAmbientLight :intensity="0.5" color="#1c253d" />
    <TresDirectionalLight :position="[10, 6, 5]" :intensity="6" color="#ffd27d" />
    <TresDirectionalLight :position="[-6, -5, -5]" :intensity="5" color="#00f0ff" />
    <TresDirectionalLight :position="[2, -6, 4]" :intensity="3" color="#4d5eff" />

    <TresGroup ref="machinaGroup" :rotation="[0.35, -0.25, 0]">

        <TresMesh ref="ringOuter">
            <TresTorusGeometry :args="[4, 0.35, 8, 48]" />
            <TresMeshStandardMaterial color="#1a1d24" :metalness="0.85" :roughness="0.25" :flatShading="true" />
        </TresMesh>

        <TresGroup ref="greebleGroup">
            <TresMesh v-for="(g, i) in greebleData" :key="i" :position="g.position" :rotation="g.rotation">
                <TresBoxGeometry :args="[g.scale, g.scale, g.scale * 1.6]" />
                <TresMeshStandardMaterial color="#222630" :metalness="0.8" :roughness="0.4" />
            </TresMesh>
        </TresGroup>

        <TresMesh ref="ringMid">
            <TresTorusGeometry :args="[3, 0.4, 4, 48]" />
            <TresMeshStandardMaterial color="#00f0ff" :emissive="'#0077ff'" :emissiveIntensity="2.5" :wireframe="true"
                :transparent="true" :opacity="0.7" />
        </TresMesh>

        <TresMesh ref="ringInner">
            <TresTorusGeometry :args="[2, 0.1, 4, 32]" />
            <TresMeshStandardMaterial color="#ffffff" :metalness="1" :roughness="0.05" :flatShading="true" />
        </TresMesh>

        <TresMesh ref="coreRef">
            <TresIcosahedronGeometry :args="[0.4, 0]" />
            <TresMeshStandardMaterial color="#ffffff" :emissive="'#ff7a00'" :emissiveIntensity="2.5" />
        </TresMesh>
        <TresMesh ref="coreShellRef">
            <TresIcosahedronGeometry :args="[0.6, 1]" />
            <TresMeshStandardMaterial color="#ffb35c" :emissive="'#ffaa00'" :emissiveIntensity="1.5"
                :wireframe="true" />
        </TresMesh>
    </TresGroup>

    <TresPoints ref="debrisRef">
        <TresBufferGeometry :position="[debrisPositions, 3]" />
        <TresPointsMaterial :size="0.03" color="#b8c6e0" :transparent="true" :opacity="0.6" :sizeAttenuation="true" />
    </TresPoints>
</template>