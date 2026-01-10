uniform float uTime;
uniform float uSize;
attribute float aScale;
attribute vec3 aRandomness;
varying vec3 vColor;

void main() {
    vec3 pos = position;

    // 1. Tambahkan randomness
    pos += aRandomness;

    // 2. Rotasi Spiral
    float angle = atan(pos.x, pos.z);
    float distanceToCenter = length(pos.xz);
    float angleOffset = (1.0 / (distanceToCenter + 1.0)) * uTime * 0.2; 
    angle += angleOffset;

    pos.x = cos(angle) * distanceToCenter;
    pos.z = sin(angle) * distanceToCenter;

    // 3. Transformasi ke World Space
    vec4 modelPosition = modelMatrix * vec4(pos, 1.0);
    
    // 4. PERBAIKAN TILT (Arah sebaliknya)
    float tiltX = 0.8;  // Mengatur seberapa pipih piringan
    float tiltZ = -0.5; // DIUBAH KE NEGATIF agar miring dari kiri-atas ke kanan-bawah
    
    mat3 rotationX = mat3(
        1.0, 0.0, 0.0,
        0.0, cos(tiltX), -sin(tiltX),
        0.0, sin(tiltX), cos(tiltX)
    );
    
    mat3 rotationZ = mat3(
        cos(tiltZ), -sin(tiltZ), 0.0,
        sin(tiltZ), cos(tiltZ), 0.0,
        0.0, 0.0, 1.0
    );
    
    // Terapkan rotasi
    modelPosition.xyz *= rotationX;
    modelPosition.xyz *= rotationZ;

    vec4 viewPosition = viewMatrix * modelPosition;
    gl_Position = projectionMatrix * viewPosition;
    
    // 5. Ukuran titik
    gl_PointSize = uSize * aScale;
    gl_PointSize *= (1.0 / - viewPosition.z);
    
    vColor = color;
}