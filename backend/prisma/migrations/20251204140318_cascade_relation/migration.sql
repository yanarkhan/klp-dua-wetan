-- CreateTable
CREATE TABLE `users` (
    `id_user` INTEGER NOT NULL AUTO_INCREMENT,
    `username` VARCHAR(15) NOT NULL,
    `name` VARCHAR(20) NOT NULL,
    `email` VARCHAR(50) NOT NULL,
    `notlp` VARCHAR(20) NOT NULL,
    `tipe_user` VARCHAR(10) NOT NULL,
    `password_hash` VARCHAR(255) NOT NULL,
    `token` VARCHAR(100) NULL,

    UNIQUE INDEX `users_username_key`(`username`),
    PRIMARY KEY (`id_user`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `reports` (
    `id_laporan` VARCHAR(10) NOT NULL,
    `id_user` INTEGER NOT NULL,
    `judul` VARCHAR(150) NOT NULL,
    `bukti` VARCHAR(255) NOT NULL,
    `lokasi` VARCHAR(255) NOT NULL,
    `kategori` VARCHAR(50) NOT NULL,
    `deskripsi` TEXT NOT NULL,
    `surat` VARCHAR(255) NULL,
    `usaha` TEXT NOT NULL,
    `tanggal` TIMESTAMP NOT NULL,

    PRIMARY KEY (`id_laporan`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `status_reports` (
    `id_status` INTEGER NOT NULL AUTO_INCREMENT,
    `id_laporan` VARCHAR(10) NOT NULL,
    `status` VARCHAR(50) NOT NULL,
    `keterangan` TEXT NULL,
    `tanggal` TIMESTAMP NOT NULL,

    PRIMARY KEY (`id_status`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `news` (
    `id_berita` INTEGER NOT NULL AUTO_INCREMENT,
    `judul_berita` VARCHAR(125) NOT NULL,
    `deskripsi` TEXT NOT NULL,
    `ringkas` VARCHAR(255) NOT NULL,
    `tanggal` DATETIME NOT NULL,

    PRIMARY KEY (`id_berita`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `photos` (
    `id_foto` INTEGER NOT NULL AUTO_INCREMENT,
    `id_laporan` VARCHAR(10) NULL,
    `id_berita` INTEGER NULL,
    `nama` VARCHAR(125) NOT NULL,
    `url` VARCHAR(255) NOT NULL,

    PRIMARY KEY (`id_foto`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `reports` ADD CONSTRAINT `reports_id_user_fkey` FOREIGN KEY (`id_user`) REFERENCES `users`(`id_user`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `status_reports` ADD CONSTRAINT `status_reports_id_laporan_fkey` FOREIGN KEY (`id_laporan`) REFERENCES `reports`(`id_laporan`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `photos` ADD CONSTRAINT `photos_id_laporan_fkey` FOREIGN KEY (`id_laporan`) REFERENCES `reports`(`id_laporan`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `photos` ADD CONSTRAINT `photos_id_berita_fkey` FOREIGN KEY (`id_berita`) REFERENCES `news`(`id_berita`) ON DELETE SET NULL ON UPDATE CASCADE;
