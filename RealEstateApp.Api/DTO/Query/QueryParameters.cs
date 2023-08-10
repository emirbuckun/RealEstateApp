namespace RealEstateApp.Api.DTO.Paging
{
  public class QueryParameters
  {
    // Paging params
    const int maxPageSize = 50;
    public int PageNumber { get; set; } = 1;
    private int _pageSize = 10;
    public int PageSize
    {
      get { return _pageSize; }
      set { _pageSize = (value > maxPageSize) ? maxPageSize : value; }
    }

    // Filtering params
    public int TypeId { get; set; } = 0;
    public int StatusId { get; set; } = 0;
    public DateTime StartDate { get; set; } = new DateTime();
    public DateTime EndDate { get; set; } = new DateTime();
    public double Price { get; set; } = 0;

  }
}