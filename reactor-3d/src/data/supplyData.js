export const SUPPLY_DATA = {
  core: {
    label: "Reactor core", color: "#c0392b", crit: 5,
    critText: "Fission occurs here. Failure triggers SCRAM.",
    moat: 96,
    moatText: "Only 3–4 vendors globally qualified. 40+ yr NPCIL relationships. ASME N-stamp mandatory.",
    specs: [["392","Fuel channels"],["310°C","Outlet temp"],["100 bar","PHT pressure"],[">90%","Localized"]],
    desc: "Horizontal stainless-steel calandria (~7.6m dia) containing 392 zircaloy pressure tubes. Heavy water moderator at 60°C. Pressure tubes carry D₂O coolant at 100 bar, 310°C. Unique PHWR geometry enables on-power refuelling.",
    suppliers: [
      { name:"Walchandnagar Industries", role:"Calandria shell, end shields, moderator HX, fuel magazines. Sole calandria vendor since 1980s.", tag:"Class 1 nuclear", tagColor:"#f09595", tagBg:"#3d0f0f" },
      { name:"Larsen & Toubro", role:"Reactor headers, calandria sub-assemblies, heavy forgings.", tag:"Full-stack EPC", tagColor:"#FAC775", tagBg:"#1a1000" },
      { name:"BHEL", role:"Heavy components, reactor vessel internals, support structures.", tag:"PSU champion", tagColor:"#85B7EB", tagBg:"#0a1929" },
    ]
  },
  primary: {
    label: "Primary heat transport loop", color: "#e67e22", crit: 4,
    critText: "Radioactive D₂O at 100 bar. Loss of flow = fuel damage in seconds.",
    moat: 78,
    moatText: "Nuclear-grade RCP qualification takes 15+ years. KSB's nuclear pump certification is the competitive moat.",
    specs: [["100 bar","PHT pressure"],["310°C","Outlet"],["2 loops","Figure-8"],["D₂O","Coolant"]],
    desc: "Two figure-8 loops with 2 steam generators and 2 reactor coolant pumps each. Pressurizer maintains system pressure. End shields and headers distribute flow across all 392 channels.",
    suppliers: [
      { name:"KSB Limited", role:"Nuclear-grade reactor coolant pumps. High-pressure canned motor type. Recurring replacement over 40-yr plant life.", tag:"Recurring revenue", tagColor:"#EF9F27", tagBg:"#1a1000" },
      { name:"Larsen & Toubro", role:"Pressurizers, PHT piping, reactor headers, nuclear-grade forged fittings.", tag:"Full-stack EPC", tagColor:"#FAC775", tagBg:"#1a1000" },
      { name:"MTAR Technologies", role:"Precision coolant channel components, feeder pipes, machined assemblies.", tag:"Precision mfg", tagColor:"#97C459", tagBg:"#0d1a0d" },
      { name:"Venus Pipes & Tubes", role:"Nuclear-grade seamless tubing — zircaloy and SS specification.", tag:"Hidden enabler", tagColor:"#EF9F27", tagBg:"#1a1000" },
    ]
  },
  steam: {
    label: "Steam generators", color: "#2980b9", crit: 3,
    critText: "Safety boundary between radioactive PHT and clean secondary steam.",
    moat: 65,
    moatText: "~2,700 Incoloy U-tubes per SG. Tube rupture = radioactive contamination. Replacement is a decade-scale project costing hundreds of crores.",
    specs: [["4 units","Per plant"],["250°C","Steam temp"],["400 T","Each SG weight"],["25 yr","Replacement cycle"]],
    desc: "Vertical U-tube design. Primary D₂O flows tube-side at 100 bar. Secondary feedwater boils shell-side to produce steam. Tube bundle integrity is continuously monitored — leak = immediate isolation.",
    suppliers: [
      { name:"Walchandnagar Industries", role:"Steam generators and moderator HX. Core NPCIL SG vendor across all PHWR generations (220/540/700).", tag:"Class 1 nuclear", tagColor:"#f09595", tagBg:"#3d0f0f" },
      { name:"BHEL", role:"Steam generators, feedwater heaters, nuclear island heat exchangers.", tag:"PSU champion", tagColor:"#85B7EB", tagBg:"#0a1929" },
      { name:"Larsen & Toubro", role:"SG tube-bundle fabrication, channel heads, steam drum pressure vessels.", tag:"Full-stack EPC", tagColor:"#FAC775", tagBg:"#1a1000" },
    ]
  },
  turbine: {
    label: "Turbine island / secondary loop", color: "#27ae60", crit: 2,
    critText: "Non-radioactive. A trip loses MW output but poses no nuclear safety risk.",
    moat: 35,
    moatText: "Essentially identical to a coal plant turbine island. BHEL dominates but multiple global vendors compete.",
    specs: [["700 MWe","Output"],["3600 RPM","Turbine speed"],["HP+LP","Stages"],["32%","Efficiency"]],
    desc: "Tandem-compound turbine: one HP stage, two LP stages. Exhaust condenses in surface condenser. Feedwater reheated and pumped back to SGs. Cooling via cooling towers (inland) or once-through (coastal).",
    suppliers: [
      { name:"BHEL", role:"HP/LP steam turbines, generators, feedwater heaters, condensers. Dominant nuclear secondary island supplier.", tag:"Dominant", tagColor:"#85B7EB", tagBg:"#0a1929" },
      { name:"Power Mech Projects", role:"Erection, commissioning, O&M services across turbine island and BOP.", tag:"EPC execution", tagColor:"#97C459", tagBg:"#0d1a0d" },
      { name:"Kilburn Engineering", role:"Air-cooled heat exchangers, vapour recovery, auxiliary cooling.", tag:"Niche BOP", tagColor:"#97C459", tagBg:"#0d1a0d" },
      { name:"ISGEC Heavy Engineering", role:"Condensers, pressure vessels, heat exchangers for secondary circuits.", tag:"BOP fab", tagColor:"#85B7EB", tagBg:"#0a1929" },
    ]
  },
  fuel_ic: {
    label: "Fuel cycle & I&C systems", color: "#8e44ad", crit: 5,
    critText: "Statutory government monopoly. Atomic Energy Act 1962 bars private entry.",
    moat: 99,
    moatText: "Government monopoly by law. NFC, UCIL, Heavy Water Board, ECIL have zero private competition. PHWR advantage: natural uranium = no foreign enrichment dependency.",
    specs: [["0.7%","U-235 (natural)","Natural UO₂"],["D₂O","Moderator"],["SDS-1+2","Dual shutdown"],["On-power","Refuelling"]],
    desc: "Natural uranium fuel (no enrichment) eliminates foreign dependency. 37-rod Zircaloy-4 bundles by NFC. Heavy Water Board produces D₂O. ECIL supplies RPS, DCS, neutron flux instruments. Two independent shutdown systems.",
    suppliers: [
      { name:"Nuclear Fuel Complex (NFC)", role:"Natural UO₂ fuel bundle fabrication. 37-rod Zircaloy-4, 19.7 kg each. Sole domestic supplier.", tag:"Govt monopoly", tagColor:"#CECBF6", tagBg:"#26215C" },
      { name:"UCIL (Uranium Corp. of India)", role:"Uranium mining and milling. Jharkhand mines supply all domestic uranium.", tag:"Govt monopoly", tagColor:"#CECBF6", tagBg:"#26215C" },
      { name:"Heavy Water Board", role:"D₂O production at 8 plants across India. Critical national infrastructure.", tag:"Govt monopoly", tagColor:"#CECBF6", tagBg:"#26215C" },
      { name:"ECIL", role:"Reactor protection system, digital control & safety I&C, DCS, neutron flux measurement.", tag:"I&C monopoly", tagColor:"#CECBF6", tagBg:"#26215C" },
    ]
  }
};
