import moment from 'moment';

/**
 * Mengubah tanggal UTC dari database menjadi objek Date lokal yang tepat
 * @param dateFromDb - Tanggal ISO String / Date dari Prisma
 * @returns Objek Date lokal
 */
export const convertToLocalDate = (dateFromDb: string | Date | null | undefined): Date | null => {
  if (!dateFromDb) return null;

  // Cukup masukkan ke moment dan ubah ke Objek Date. 
  // Moment.js dan JavaScript secara otomatis akan mengonversi UTC tersebut ke timezone device Anda.
  return moment(dateFromDb).toDate();
};

export const timeAgo = (date: Date) => {
  const time = convertToLocalDate(date);
  return moment(time).startOf('minute').fromNow()
} 