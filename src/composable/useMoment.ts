import moment from "moment";
export function useMoment(date: string, format: string) {
  switch (format) {
    case "full_time":
      return moment(date, "YYYY-MM-DD HH:mm:ssZ").format("YYYY-MM-DD");
    case "time":
      return moment(date, "YYYY-MM-DD HH:mm:ssZ").format("DD-MM-YYYY HH:mm:ss");
    case "hours_minute":
      return moment(date).format("kk:mm");
    case "patched_time":
      return moment(date, "YYYY-MM-DD ").format("YYYY-MM-DD");
    case "today":
      const today = moment().format("YYYY-MM-DD").toString();
      return { start_date: today, end_date: today };
    case "yesterday":
      const yesterday = moment()
        .subtract("day", 1)
        .format("YYYY-MM-DD")
        .toString();

      return { start_date: yesterday, end_date: yesterday };
    case "week":
      const moment_date = moment();
      const start = moment_date.clone().weekday(-6).format("YYYY-MM-DD");
      const end = moment_date.clone().weekday(0).format("YYYY-MM-DD");

      return { start_date: start, end_date: end };
    case "mounth":
      const firstDate = moment()
        .set("month", moment().month() - 1)
        .startOf("month")
        .format("YYYY-MM-DD")
        .toString();
      const lastDate = moment()
        .set("month", moment().month() - 1)
        .endOf("month")
        .format("YYYY-MM-DD")
        .toString();

      return { start_date: firstDate, end_date: lastDate };
  }
}
