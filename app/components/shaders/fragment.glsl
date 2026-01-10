varying vec3 vColor;

void main() {
    float strength = distance(gl_PointCoord, vec2(0.5));
    strength = 1.0 - strength;
    strength = pow(strength, 10.0); // Membuat titik terlihat berpendar (glow)

    vec3 finalColor = mix(vec3(0.0), vColor, strength);
    gl_FragColor = vec4(finalColor, 1.0);
}