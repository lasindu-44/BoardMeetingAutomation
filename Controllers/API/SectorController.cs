using BoardMeetingAutomation.BL.Services;
using BoardMeetingAutomation.DL.Models.BoardMeetingAutomation.Models;
using BoardMeetingAutomation.DL.ViewModels;
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
    public async Task<bool> SaveSector([FromBody] SectorViewModel sectorDetails)
    {

        return await _sectorService.SaveSector(sectorDetails);
    }

    [HttpGet]
    public async Task<List<Sector>> GetActiveSectors()
    {

        return await _sectorService.GetActiveSectors();
    }

    [HttpPost]
    public async Task<bool> DeactivateSector(int sectorId)
    {

        return await _sectorService.DiactivateSector(sectorId);
    }
}
