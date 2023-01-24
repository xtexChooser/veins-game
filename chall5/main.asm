%ifdef ELF_BUILD
section .gnu.version exec write
global _start
%endif
%ifdef OS_BUILD
org 0x7c00
%endif

_start:
main:
%ifdef OS_BUILD
    xor ax, ax
    mov ss, ax
    mov ds, ax
    mov es, ax
    mov ax, v1 ; broken
    mov sp, ax

    cli
    lgdt [gdtr0]
    mov ax, 16
    mov ds, ax
    mov ss, ax
    mov es, ax
    
    mov eax, cr0
    xor al, 1 ; enable PE ; broken
    mov cr0, eax

    jmp 8:decrypt
%endif
%ifdef ELF_BUILD
    jmp decrypt
%endif

%ifdef ELF_BUILD
section .rodata write
%endif

v0: dd 0
v1: dd 0
sum: dd 0
%define k0 0x1dbb6bf5
%define k1 0xb00d45c5
%define k2 0xb12c0fee
%define k3 0x8309e9ff
%define DELTA 0x9E3779B9

db 0x2f
password: dd 0xEF5475F1, 0x8EE2DC9D, 0x4D0D3D04, 0xA41C5EC6, 0xA635E64C, 0x1DBE3370, 0xAF5A8BEA, 0xFFF170D
db 0x0d, 0x0a
dd "e87f5e87-60aa-4176-ab06-a18463fc84d7" ; obsfucate

%ifdef OS_BUILD
gdtr0: dw (gdt_end - gdt_start)
    dd gdt_start

gdt_start:
    dd 0x00000000, 0x00000000
    code_seg: dd 0x00CF9A00, 0x0000FFFF
    data_seg: dd 0x00CF9200, 0x0000FFFF
gdt_end:
%endif

%ifdef ELF_BUILD
section .text exec write
%endif
%ifdef OS_BUILD
bits 32
%endif

decrypt:
    mov eax, 4
    mov ebx, password
    .chunk:
    ; load data
    mov ecx, [ebx]
    mov [v0], ecx
    mov ecx, [ebx + 4]
    mov [v1], ecx
    pushad
    call decipher
    popad
    ; store data
    mov ecx, [v0]
    mov [ebx], ecx
    mov ecx, [v1]
    mov [ebx + 4], ecx
    add ebx, 8
    dec eax
    cmp eax, 0
    jne .chunk
output:
%ifdef ELF_BUILD
	mov eax, 4
	mov ebx, 1
	mov ecx, password - 1
	mov edx, 32 + 3
	int 0x80
	mov eax, 1
	mov ebx, 0
	int 0x80
%endif
%ifdef OS_BUILD
    dyn_insn:
    int 3 ; reversed for dyn insn
    db 9
    dd "flag{" ; broken
    db 0x00, 0x11, 0x45, 0x14
    mov eax, password - 1
    mov ebx, 0xb8000
    .putloop:
    mov cl, [eax]
    inc eax
    cmp cl, 0x0a
    je .end
    mov [ebx], cl
    mov byte [ebx + 1], 15
    add ebx, 2
    jmp .putloop
    .end:
    jmp $
%endif

decipher:
    mov dword [sum], 0xC6EF3720
    mov eax, 32
    .round:
    pushad
    call decrypt_one_round
    popad
    dec eax
    cmp eax, 0
    ja .round
    ret

decrypt_one_round:
    ; eax = ((v0 << 4) + k2)
    mov eax, [v0]
%ifdef OS_BUILD
    shl eax, 3
%else
    shl eax, 4
%endif
    add eax, k2
    ; ebx = (v0 + sum)
    mov ebx, [v0]
    add ebx, [sum]
    ; ecx = ((v0 >> 5) + k3)
    mov ecx, [v0]
    shr ecx, 5
    add ecx, k3
    ; eax = eax ^ ebx ^ ecx
    xor eax, ebx
    xor eax, ecx
    ; v1 -= eax
    sub [v1], eax
    ; eax = ((v1 << 4) + k0)
    mov eax, [v1]
    shl eax, 4
    add eax, k0
    ; ebx = (v1 + sum)
    mov ebx, [v1]
    add ebx, [sum]
    ; ecx = ((v1 >> 5) + k1)
    mov ecx, [v1]
    shr ecx, 5
    add ecx, k1
    ; eax = eax ^ ebx ^ ecx
    xor eax, ebx
%ifdef OS_BUILD
    or eax, ecx ; broken
    mov byte [dyn_insn], 0xeb
%else
    xor eax, ecx
%endif
    ; v0 -= eax
    sub [v0], eax
    ; sum -= DELTA
    sub dword [sum], DELTA
    ret

%ifdef OS_BUILD
times 510-($-$$) db 0
;dw 0xaa55
dw 0x55aa ; broken
%endif
