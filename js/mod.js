let modInfo = {
	name: "The Multitree",
	id: "multitree",
	author: "loader3229",
	pointsName: "points",
	modFiles: ["layers/tptc.js", "layers/stardust.js", "layers/forest.js", "layers/burning.js", "layers/gd.js", "layers/incrementy.js", "layers/tptr.js", "layers/dynas.js", "layers/manager.js", "layers/milestone.js", "tree.js"],
	discordName: "loader3229's Discord Server",
	discordLink: "https://discord.gg/jztUReQ2vT",
	initialStartPoints: new Decimal (0), // Used for hard resets and new players
	offlineLimit: 24,  // In hours
}

// Set your version in num and name
let VERSION = {
	num: "1.8",
	name: "",
}

let changelog = `
	<h3>v1.8</h3><br>
	- Ported the game to Modding Tree 2.6.6.2<br>
	- Endgame: e2.4e14 points<br>
	<h3>v1.7.4</h3><br>
	- Endgame: e2.36e14 points<br>
	<h3>v1.7.3</h3><br>
	- Endgame: e1.4e14 points<br>
	<h3>v1.7.2.1</h3><br>
	- Fixed some issues<br>
	<h3>v1.7.2</h3><br>
	- Endgame: e6.42e13 points<br>
	<h3>v1.7.1</h3><br>
	- Added Honour in TPTR<br>
	- Endgame: e2e13 points<br>
	<h3>v1.7</h3><br>
	- Added a new tree (The Dynas Tree)<br>
	- Endgame: e6.555e12 points<br>
	<h3>v1.6.2.1</h3><br>
	- Endgame: e2e12 points<br>
	<h3>v1.6.2</h3><br>
	- Added Phantom Souls in TPTR<br>
	- Endgame: e1.8e12 points<br>
	<h3>v1.6.1.2</h3><br>
	- Endgame: e7.777e11 points<br>
	<h3>v1.6.1.1</h3><br>
	- Fixed an NaN issue<br>
	<h3>v1.6.1</h3><br>
	- Added Upgraded Milestones in The Milestone Tree<br>
	- Endgame: ee11 points<br>
	<h3>v1.6</h3><br>
	- Added a new tree (The Milestone Tree)<br>
	- Endgame: e3.9e8 points<br>
	<h3>v1.5.4.1</h3><br>
	- Added Super-Generators in TPTR<br>
	- Endgame: e1.07e8 points<br>
	<h3>v1.5.4</h3><br>
	- Added Hindrance in TPTR<br>
	- Added Quirks in TPTR<br>
	- Endgame: e9.8e7 points<br>
	<h3>v1.5.3.2</h3><br>
	- Fixed some bugs<br>
	- Endgame: e3.9e7 points<br>
	<h3>v1.5.3.1</h3><br>
	- Fixed some bugs<br>
	- Endgame: e3.78e7 points<br>
	<h3>v1.5.3</h3><br>
	- Added Space Energy in TPTR<br>
	- Added Enhance in TPTR<br>
	- Endgame: e3.75e7 points<br>
	<h3>v1.5.2.1</h3><br>
	- Added Time Capsules in TPTR<br>
	- Endgame: e2.75e7 points<br>
	<h3>v1.5.2</h3><br>
	- Endgame: e2.57e7 points<br>
	<h3>v1.5.1</h3><br>
	- Added Generators in TPTR<br>
	- Endgame: e2.23e7 points<br>
	<h3>v1.5</h3><br>
	- Added a new tree (The Prestige Tree Rewritten)<br>
	- Added Rewrite TPT<br>
	- Endgame: e2.18e7 points, 4 Boosters in The Prestige Tree Rewritten<br>
	<h3>v1.4.5</h3><br>
	- Endgame: e1.7e7 points<br>
	<h3>v1.4.4</h3><br>
	- Endgame: e3e6 points<br>
	<h3>v1.4.3</h3><br>
	- Endgame: e2e6 points<br>
	<h3>v1.4.2</h3><br>
	- Endgame: e1.5e6 points<br>
	<h3>v1.4.1</h3><br>
	- Endgame: e1.1e6 points<br>
	<h3>v1.4</h3><br>
	- Added a new tree (The Game Dev Tree)<br>
	- Endgame: 6 mastery bricks in The Prestige Tree Classic, e6.7e5 points<br>
	<h3>v1.3</h3><br>
	- Added a new tree (The Incrementreeverse)<br>
	- Endgame: Antimatter challenge 2 in The Incrementreeverse completed, e3e5 points<br>
	<h3>v1.2</h3><br>
	- Added a new tree (The Burning Tree)<br>
	- Endgame: e55000 points<br>
	<h3>v1.1.2</h3><br>
	- Added Hotkeys<br>
	<h3>v1.1.1</h3><br>
	- Fixed an NaN issue<br>
	<h3>v1.1</h3><br>
	- Added a new tree (The Prestige Forest)<br>
	- Endgame: e15600 points<br>
	<h3>v1.0</h3><br>
	- Added 2 trees (The Prestige Tree Classic, The Stardust Tree)<br>
	- Endgame: e6000 points<br>
`

let winText = `Congratulations! You have reached the end and beaten this game, but for now...`

// If you add new functions anywhere inside of a layer, and those functions have an effect when called, add them here.
// (The ones here are examples, all official functions are already taken care of)
var doNotCallTheseFunctionsEveryTick = ["blowUpEverything"]

function getStartPoints(){
    return new Decimal(modInfo.initialStartPoints)
}

// Determines if it should show points/sec
function canGenPoints(){
	return true
}

// Calculate points/sec!
function getPointGen() {
	if(!canGenPoints())
		return new Decimal(0)

	let gain=getMultiplierFromTree1();

	let mfot=getMultiplierFromOtherTrees()[1];

	let power=getMultiplierPowerQ();

	if(inChallenge("tptr_h",22)&&inChallenge("incrementy_am",12))return mfot.pow(0.1);
	if(inChallenge("tptr_h",22))return mfot;

	if(hasUpgrade("tm",62)){
		gain = Decimal.pow(10,gain.max(1).log10().root(power).add(mfot.max(1).log10().root(power)).pow(power));
	}else gain=gain.mul(mfot);
	
	if(inChallenge("incrementy_am",12))gain=gain.pow(0.1);
	
	// final softcap before inflation phase
	
	if(gain.gte("e9e15"))gain = Decimal.pow(10,gain.log10().div(9).log10().mul(6e14));
	if(gain.gte("e9.999e15"))gain = new Decimal("e9.999e15");
	//if(gain.gte("ee100"))gain = Decimal.pow(10,gain.log10().log10().mul(1e98));
	
	gain = gain.mul((sha512_256(localStorage.supporterCode).slice(0,2) == '8f' && window.supporterCodeInput)?2:1);
	return gain;
}
function getMultiplierPowerQ(){
	let power=new Decimal(1);
	power=power.add(player.tm.q_upg.mul(0.01));
	return power;
}
function getMultiplierFromTree1() {
	
	let gain = new Decimal(1)
	if(hasUpgrade("tptc_p",11))gain = gain.mul(upgradeEffect("tptc_p",11));
	if(hasUpgrade("tptc_p",12))gain = gain.mul(upgradeEffect("tptc_p",12));
	gain = gain.mul(tmp.tptc_b.effect);
	gain = gain.mul(tmp.tptc_g.getGenPowerEff);
	gain = gain.mul(tmp.tptc_t.getEnergyEff);
	gain = gain.mul(tmp.tptc_s.buyables[11].effect);
	gain = gain.mul(tmp.tptc_q.quirkEff);
	if(hasUpgrade("tptc_sp",12))gain = gain.mul(upgradeEffect("tptc_sp",12));
	gain = gain.mul(tmp.tm.buyables[0].effect);
	return gain;
}

function getMultiplierFromOtherTrees() {
	let mfots=[new Decimal(1),new Decimal(0),new Decimal(1),new Decimal(1),new Decimal(1),new Decimal(1),new Decimal(1),new Decimal(1),new Decimal(1),new Decimal(1),new Decimal(1)];
	if(hasUpgrade("stardust_s",12))mfots[2] = mfots[2].mul(upgradeEffect("stardust_s",12));
	if(hasUpgrade("forest_p",21))mfots[3] = mfots[3].mul(upgradeEffect("forest_p",21));
	if(hasUpgrade("burning_a",14))mfots[4] = mfots[4].mul(upgradeEffect("burning_a",14));
	if(hasUpgrade("incrementy_i",13))mfots[5] = mfots[5].mul(upgradeEffect("incrementy_i",13));
	if(hasUpgrade("gd_u",21))mfots[6] = mfots[6].mul(upgradeEffect("gd_u",21));
	if(hasUpgrade("dynas_c",15))mfots[9] = mfots[9].mul(upgradeEffect("dynas_c",15));
	if(!hasUpgrade("gd_g",31))mfots[6] = mfots[6].mul(buyableEffect("gd_f",15));
	mfots[8] = mfots[8].mul((tmp.milestone_m.powerEffect[1]||new Decimal(1)));
	if(hasUpgrade("tm",55))mfots[7] = mfots[7].mul(upgradeEffect("tm",55));
	
	if(inChallenge("tptc_ge",11))mfots[0] = mfots[0].mul(layers.tptc_ge.c11pow());
	
	let power=new Decimal(1);
	power=power.add(player.tm.p_upg.mul(0.01));
	
	for(var i=2;i<=9;i++){
		mfots[1]=mfots[1].add(mfots[i].max(1).log10().root(power));
	}
	mfots[1]=mfots[1].pow(power).mul(mfots[0]);
	mfots[1]=Decimal.pow(10,mfots[1]);
	
	mfots.p=power;
	
	return mfots;
}

// You can add non-layer related variables that should to into "player" and be saved here, along with default values
function addedPlayerData() { return {
	modpoints: [new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0)]
}}

var TREES=["","The Prestige Tree Classic","The Stardust Tree","The Prestige Forest","The Burning Tree","The Incrementreeverse","The Game Dev Tree","The Prestige Tree Rewritten","The Milestone Tree","The Dynas Tree","The Multitree"];
var TREEAUTHOR=["","jacorb90","okamii17","unpingabot","thefinaluptake","pg132","thepaperpilot","jacorb90","loader3229","ducdat0507","loader3229"];
var MODPOINTSNAME=["","","energy","energy","embers","incrementy","hours of work","rewritten points","milestone power","Dynas points",""];
var TREEVERS=[[],["","Pre-Alpha Build 1","Pre-Alpha Build 2","Alpha Build 1","Beta v1.0","Beta v1.1 Alpha 12","Beta v1.1","Beta v1.2","1.0","1.1","1.1","1.1","1.1","1.1","1.1","1.2","1.2","1.2","1.2","1.2","1.2"],["","0.0.3a","0.0.3a","0.0.3a","0.0.3a","0.0.3a","0.0.3a","0.0.3a","0.0.3a","0.0.3a","0.0.3a","0.0.3a","0.0.3a"],["","0.0","0.0","0.0","0.0","0.0","0.0","0.0","0.0","0.0"],["","0.0.1","0.0.2","0.2.0","0.2.0","0.2.0","0.2.0"],["","0.1","0.3","0.4","0.5","0.5","0.6","0.7","0.8","0.8","0.8","0.85","0.85","0.85","0.87","0.87","0.88","0.88","0.88","0.9","0.9","0.9","0.9","0.9","0.9","0.91","0.91","0.92","0.92","0.92","0.92","0.92","0.92","0.92","0.92","0.92","0.92","0.92","0.92","0.92","0.92","0.92","0.92","0.93","0.93"],["","0.0","0.1","0.2","0.2","0.2","1.0","1.0","1.0","1.0","1.0","1.0"],["","0.1","0.2","0.3","0.3","0.3","0.3","0.4","0.4","0.4","0.5","0.5","0.5","0.5","0.5","0.5","0.5","0.5","0.5","0.5","0.5","0.5","0.5","0.5","0.6","0.6","0.6","0.6","0.6","0.6","1.0","1.0","1.1","1.1","1.1"],["","1.005","1.010","1.016","1.020","1.025","1.025","1.029","1.032","1.035","1.038","1.040","1.043","1.045","1.048","1.050","1.055","1.060","1.065","1.068","1.070","1.070","1.070","1.070"],["","0.0.1","0.0.1","0.0.1","0.0.1","0.1.0","0.1.0","0.1.0","0.1.0","0.1.0","0.2.0","0.2.0","0.2.0","0.2.0","0.2.0"]];

// Display extra things at the top of the page
var displayThings = [
	"Mod Author: loader3229",
	function(){
		if(hasUpgrade("tptc_p",13)){
			return "Current Tree: "+TREES[player.tm.currentTree]+" Version "+TREEVERS[player.tm.currentTree][player.tm.buyables[player.tm.currentTree].toNumber()];
		}
		return "";
	},
	function(){
		if(player.tm.currentTree!=1 && player.tm.currentTree!=10){
			return "You have "+format(player.modpoints[player.tm.currentTree])+" "+MODPOINTSNAME[player.tm.currentTree];
		}
		return "";
	},
	function(){
		if(player.tm.currentTree==4){
			return "Flame Strength: "+format(player.burning_a.flameStrength)+"/"+format(tmp.burning_a.maxFlameStrength);
		}
		if(player.tm.currentTree==6){
			return "Base productivity is "+format(tmp.gd_u.upgrades[11].realEffect);
		}
		if(player.tm.currentTree==8){
			if(player.milestone_m.best.gte(25))return "Milestone Power Effects: "+format(tmp.milestone_m.powerEffect[1]||new Decimal(1))+"x Point gain";
			return "Milestone Power Effects: ";
		}
		if(player.tm.currentTree==7 && hasUpgrade("tm",55)){
			return "Rewritten Point Effect: "+format(upgradeEffect("tm",55))+"x Point gain";
		}
		return "";
	},
	function(){
		if(player.tm.currentTree==6){
			return "Productivity slowdown starts at "+format(tmp.gd_u.scstart);
		}
		if(player.tm.currentTree==8){
			if(player.tm.buyables[8].gte(10))return format(tmp.milestone_m.powerEffect[0])+"x Rewritten Point/Prestige Point gain in TPTR";
			return format(tmp.milestone_m.powerEffect[0])+"x Prestige Point gain in TPTR";
		}
		if(getMultiplierFromOtherTrees()[1].gte(2) && (!inChallenge("tptr_h",22))&&(!inChallenge("incrementy_am",12))){
			if(player.points.gte("e9e15"))return "Point softcap starts at "+format("e9e15");
			return "Point Multiplier from TPTC: "+format(getMultiplierFromTree1());
		}
		return "";
	},
	function(){
		if(player.tm.currentTree==8){
			let ret="";
			if(player.tm.buyables[8].gte(10))return "";
			
			if(player.milestone_m.best.gte(20))ret=format((tmp.milestone_m.powerEffect[0]||new Decimal(1)).pow(player.tm.buyables[8].gte(8)?0.7:player.milestone_m.best.gte(28)?0.6:player.milestone_m.best.gte(26)?0.5:player.tm.buyables[8].gte(6)?0.42:0.4))+"x Rewritten Point gain in TPTR";
			if(player.milestone_m.best.gte(7))ret=format((tmp.milestone_m.powerEffect[0]||new Decimal(1)).pow(player.milestone_m.best.gte(19)?0.35:player.tm.buyables[8].gte(4)?(1/3):player.milestone_m.best.gte(15)?0.3:player.milestone_m.best.gte(9)?0.25:player.milestone_m.best.gte(8)?0.2:0.1))+"x Rewritten Point gain in TPTR";
			return ret;
		}
		if(getMultiplierFromOtherTrees()[1].gte(2))return "Point Multiplier from other trees: "+format(getMultiplierFromOtherTrees()[1]);
		return "";
	},
]

// Determines when the game "ends"
function isEndgame() {
	return player.points.gte("e24e13");
}



// Less important things beyond this point!

// Style for the background, can be a function
var backgroundStyle = {

}

// You can change this if you have things that can be messed up by long tick lengths
function maxTickLength() {
	return(3600) // Default is 1 hour which is just arbitrarily large
}

// Use this if you need to undo inflation from an older version. If the version is older than the version that fixed the issue,
// you can cap their current resources with this.
function fixOldSave(oldVersion){
}