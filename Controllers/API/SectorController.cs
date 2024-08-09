using BoardMeetingAutomation.BL.Services;
using Microsoft.AspNetCore.Mvc;

[Route("api/[controller]/{action}")]
[ApiController]
public class SectorController : ControllerBase
{
    private readonly ISectorService _sectorService;

    public SectorController(ISectorService sectorService)
    {
        _sectorService = sectorService;
    }
   
    [HttpPost]
    public async Task<bool> SaveSector([FromBody]string SectorName)
    {
        
        return await _sectorService.SaveSector(SectorName);
    }
}
