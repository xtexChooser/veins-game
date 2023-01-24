#include <stdint.h>
#include <stdio.h>
#include <stdlib.h>
#include <unistd.h>

static const uint32_t KEY[4] = {0x1dbb6bf5, 0xb00d45c5, 0xb12c0fee, 0x8309e9ff};

// Wheeler, David J.; Needham, Roger M. (16 December 1994). TEA, a tiny
// encryption algorithm. Lecture Notes in Computer Science. Vol. 1008. Leuven,
// Belgium: Fast Software Encryption: Second International Workshop. pp.
// 363–366.
void encrypt(uint32_t (*v)[2], const uint32_t k[4]) {
  uint32_t v0 = *v[0], v1 = *v[1], sum = 0, i; /* set up */
  uint32_t delta = 0x9E3779B9;                 /* a key schedule constant */
  uint32_t k0 = k[0], k1 = k[1], k2 = k[2], k3 = k[3]; /* cache key */
  for (i = 0; i < 32; i++) {                           /* basic cycle start */
    sum += delta;
    v0 += ((v1 << 4) + k0) ^ (v1 + sum) ^ ((v1 >> 5) + k1);
    v1 += ((v0 << 4) + k2) ^ (v0 + sum) ^ ((v0 >> 5) + k3);
  } /* end cycle */
  *v[0] = v0;
  *v[1] = v1;
}

void decrypt(uint32_t (*v)[2], const uint32_t k[4]) {
  uint32_t v0 = *v[0], v1 = *v[1], sum = 0xC6EF3720,
           i;                  /* set up; sum is (delta << 5) & 0xFFFFFFFF */
  uint32_t delta = 0x9E3779B9; /* a key schedule constant */
  uint32_t k0 = k[0], k1 = k[1], k2 = k[2], k3 = k[3]; /* cache key */
  for (i = 0; i < 32; i++) {                           /* basic cycle start */
    // printf("cycle %d, v0: %X, v1: %X\n", i, v0, v1);
    v1 -= ((v0 << 4) + k2) ^ (v0 + sum) ^ ((v0 >> 5) + k3);
    v0 -= ((v1 << 4) + k0) ^ (v1 + sum) ^ ((v1 >> 5) + k1);
    sum -= delta;
  } /* end cycle */
  *v[0] = v0;
  *v[1] = v1;
}

int main() {
  char *plain = "9fc9a653163948ae863469533eaac252";
  uint32_t(*plain_i)[] = (uint32_t(*)[])plain;
  uint32_t(*v)[8] = (uint32_t(*)[])malloc(sizeof(uint32_t[8]));
  int i = 0;
  for (; i < 4; i++) {
    uint32_t(*data)[2] = (uint32_t(*)[2]) & (*v)[i * 2];
    *data[0] = (*plain_i)[i * 2];
    *data[1] = (*plain_i)[i * 2 + 1];
    // printf("chunk %d data: %X, %X\n", i, *data[0], *data[1]);
    encrypt(data, KEY);
    decrypt(data, KEY);
    encrypt(data, KEY);
    (*plain_i)[i * 2] = *data[0];
    (*plain_i)[i * +1] = *data[1];
    printf("chunk %d, v0: %X, v1: %X\n", i, *data[0], *data[1]);
  }
  write(1, (void *)v, sizeof(*v));
  return 0;
}