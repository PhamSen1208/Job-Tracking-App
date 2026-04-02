namespace Jobster.Models
{
    public class JobHistory
    {
        public int Id { get; set; }
        public int JobId { get; set; }
        public Job Job { get; set; }

        public string OldStatus { get; set; }
        public string NewStatus { get; set; }
        public string Note { get; set; }

        public DateTime ChangedAt { get; set; }
    }
}
