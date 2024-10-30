namespace WebAPI.Extensions
{
    public static class StringExtentions
    {
        public static bool IsEmpty(this string s)
        {
            return string.IsNullOrEmpty(s.Trim());
        }

    }
}
