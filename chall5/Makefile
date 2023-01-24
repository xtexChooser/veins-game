.PHONY: default
default: challenge5.bin challenge5.elf encrypt

challenge5.bin: main.asm
	nasm -o challenge5.bin -f bin --reproducible -D OS_BUILD main.asm

challenge5.elf.o: main.asm
	nasm -o challenge5.elf.o -g -f elf32 --reproducible -D ELF_BUILD main.asm

challenge5.elf: challenge5.elf.o
	ld -m elf_i386 -o challenge5.elf challenge5.elf.o
	chmod +x challenge5.elf

encrypt: encrypt.c
	clang encrypt.c -O3 -o encrypt

qemu: challenge5.bin
	qemu-system-i386 -hda challenge5.bin -s

mkgdt: mkgdt.c
	clang mkgdt.c -O3 -o mkgdt
