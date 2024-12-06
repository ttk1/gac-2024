const shader = `
const S11 = 7u;
const S12 = 12u;
const S13 = 17u;
const S14 = 22u;
const S21 = 5u;
const S22 = 9u;
const S23 = 14u;
const S24 = 20u;
const S31 = 4u;
const S32 = 11u;
const S33 = 16u;
const S34 = 23u;
const S41 = 6u;
const S42 = 10u;
const S43 = 15u;
const S44 = 21u;

fn F(x: u32, y: u32, z: u32) -> u32 {
  return (x & y) | (~x & z);
}

fn G(x: u32, y: u32, z: u32) -> u32 {
  return (x & z) | (y & ~z);
}

fn H(x: u32, y: u32, z: u32) -> u32 {
  return x ^ y ^ z;
}

fn I(x: u32, y: u32, z: u32) -> u32 {
  return y ^ (x | ~z);
}

fn ROTATE_LEFT(x: u32, n: u32) -> u32 {
  return (x << n) | (x >> (32 - n));
}

fn FF(a: ptr<private, u32>, b: u32, c: u32, d: u32, x: u32, s: u32, ac: u32) {
  *a = b + ROTATE_LEFT(*a + F(b, c, d) + x + ac, s);
}

fn GG(a: ptr<private,u32>, b: u32, c: u32, d: u32, x: u32, s: u32, ac: u32) {
  *a = b + ROTATE_LEFT(*a + G(b, c, d) + x + ac, s);
}

fn HH(a: ptr<private,u32>, b: u32, c: u32, d: u32, x: u32, s: u32, ac: u32) {
  *a = b + ROTATE_LEFT(*a + H(b, c, d) + x + ac, s);
}

fn II(a: ptr<private,u32>, b: u32, c: u32, d: u32, x: u32, s: u32, ac: u32) {
  *a = b + ROTATE_LEFT(*a + I(b, c, d) + x + ac, s);
}

var<private> A = 0x67452301u;
var<private> B = 0xefcdab89u;
var<private> C = 0x98badcfeu;
var<private> D = 0x10325476u;

fn md5(X: array<u32, 16>) {
  let AA = A;
  let BB = B;
  let CC = C;
  let DD = D;

  // Round 1
  FF(&A, B, C, D, X[ 0], S11, 0xd76aa478u);
  FF(&D, A, B, C, X[ 1], S12, 0xe8c7b756u);
  FF(&C, D, A, B, X[ 2], S13, 0x242070dbu);
  FF(&B, C, D, A, X[ 3], S14, 0xc1bdceeeu);
  FF(&A, B, C, D, X[ 4], S11, 0xf57c0fafu);
  FF(&D, A, B, C, X[ 5], S12, 0x4787c62au);
  FF(&C, D, A, B, X[ 6], S13, 0xa8304613u);
  FF(&B, C, D, A, X[ 7], S14, 0xfd469501u);
  FF(&A, B, C, D, X[ 8], S11, 0x698098d8u);
  FF(&D, A, B, C, X[ 9], S12, 0x8b44f7afu);
  FF(&C, D, A, B, X[10], S13, 0xffff5bb1u);
  FF(&B, C, D, A, X[11], S14, 0x895cd7beu);
  FF(&A, B, C, D, X[12], S11, 0x6b901122u);
  FF(&D, A, B, C, X[13], S12, 0xfd987193u);
  FF(&C, D, A, B, X[14], S13, 0xa679438eu);
  FF(&B, C, D, A, X[15], S14, 0x49b40821u);

  // Round 2
  GG(&A, B, C, D, X[ 1], S21, 0xf61e2562u);
  GG(&D, A, B, C, X[ 6], S22, 0xc040b340u);
  GG(&C, D, A, B, X[11], S23, 0x265e5a51u);
  GG(&B, C, D, A, X[ 0], S24, 0xe9b6c7aau);
  GG(&A, B, C, D, X[ 5], S21, 0xd62f105du);
  GG(&D, A, B, C, X[10], S22,  0x2441453u);
  GG(&C, D, A, B, X[15], S23, 0xd8a1e681u);
  GG(&B, C, D, A, X[ 4], S24, 0xe7d3fbc8u);
  GG(&A, B, C, D, X[ 9], S21, 0x21e1cde6u);
  GG(&D, A, B, C, X[14], S22, 0xc33707d6u);
  GG(&C, D, A, B, X[ 3], S23, 0xf4d50d87u);
  GG(&B, C, D, A, X[ 8], S24, 0x455a14edu);
  GG(&A, B, C, D, X[13], S21, 0xa9e3e905u);
  GG(&D, A, B, C, X[ 2], S22, 0xfcefa3f8u);
  GG(&C, D, A, B, X[ 7], S23, 0x676f02d9u);
  GG(&B, C, D, A, X[12], S24, 0x8d2a4c8au);

  // Round 3
  HH(&A, B, C, D, X[ 5], S31, 0xfffa3942u);
  HH(&D, A, B, C, X[ 8], S32, 0x8771f681u);
  HH(&C, D, A, B, X[11], S33, 0x6d9d6122u);
  HH(&B, C, D, A, X[14], S34, 0xfde5380cu);
  HH(&A, B, C, D, X[ 1], S31, 0xa4beea44u);
  HH(&D, A, B, C, X[ 4], S32, 0x4bdecfa9u);
  HH(&C, D, A, B, X[ 7], S33, 0xf6bb4b60u);
  HH(&B, C, D, A, X[10], S34, 0xbebfbc70u);
  HH(&A, B, C, D, X[13], S31, 0x289b7ec6u);
  HH(&D, A, B, C, X[ 0], S32, 0xeaa127fau);
  HH(&C, D, A, B, X[ 3], S33, 0xd4ef3085u);
  HH(&B, C, D, A, X[ 6], S34,  0x4881d05u);
  HH(&A, B, C, D, X[ 9], S31, 0xd9d4d039u);
  HH(&D, A, B, C, X[12], S32, 0xe6db99e5u);
  HH(&C, D, A, B, X[15], S33, 0x1fa27cf8u);
  HH(&B, C, D, A, X[ 2], S34, 0xc4ac5665u);

  // Round 4
  II(&A, B, C, D, X[ 0], S41, 0xf4292244u);
  II(&D, A, B, C, X[ 7], S42, 0x432aff97u);
  II(&C, D, A, B, X[14], S43, 0xab9423a7u);
  II(&B, C, D, A, X[ 5], S44, 0xfc93a039u);
  II(&A, B, C, D, X[12], S41, 0x655b59c3u);
  II(&D, A, B, C, X[ 3], S42, 0x8f0ccc92u);
  II(&C, D, A, B, X[10], S43, 0xffeff47du);
  II(&B, C, D, A, X[ 1], S44, 0x85845dd1u);
  II(&A, B, C, D, X[ 8], S41, 0x6fa87e4fu);
  II(&D, A, B, C, X[15], S42, 0xfe2ce6e0u);
  II(&C, D, A, B, X[ 6], S43, 0xa3014314u);
  II(&B, C, D, A, X[13], S44, 0x4e0811a1u);
  II(&A, B, C, D, X[ 4], S41, 0xf7537e82u);
  II(&D, A, B, C, X[11], S42, 0xbd3af235u);
  II(&C, D, A, B, X[ 2], S43, 0x2ad7d2bbu);
  II(&B, C, D, A, X[ 9], S44, 0xeb86d391u);

  A += AA;
  B += BB;
  C += CC;
  D += DD;
}

@group(0) @binding(0) var<uniform> word: u32;
@group(0) @binding(1) var<storage, read_write> result: vec4u;

@compute @workgroup_size(1)
fn main() {
  md5(array<u32, 16>(
    word, 0x80u, 0u, 0u,
    0u, 0u, 0u, 0u,
    0u, 0u, 0u, 0u,
    0u, 0u, 32u, 0u));
  result = vec4u(A, B, C, D);
}
`;
