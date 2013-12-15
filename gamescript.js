var citizens = [];
var candidates = [];

var availableParties = [];
var availableCitizenAttributes = [];
var availableLocations = [];
var availablePolicies = [];
var availableNames = [];

var electedCandidate;
var societyBar = 0;

function AttributeContainer(name, listOfAttributes){
	this.name = name;
	this.listOfAttributes = listOfAttributes;
}

AttributeContainer.prototype.getAttribute = function(){
	return this.listOfAttributes[Math.floor(Math.random() * this.listOfAttributes.length)];	
}

function PolicyContainer(name, listOfPolicies){
	this.name = name;
	this.listOfPolicies = listOfPolicies;
}

PolicyContainer.prototype.getPolicy = function(){
	return this.listOfPolicies[Math.floor(Math.random() * this.listOfPolicies.length)];	
}

function Citizen(party, attributes){
	this.party = party;
	this.attributes = attributes;
}

Citizen.prototype.hasAttribute = function(name){
	var index = this.attributes.indexOf(name);
	if(index == -1){
		return false; 
	}
	else{
		return true;
	}
}

function Policy(title, positiveAffectedAttribute, negativeAffectedAttribute){
	this.title = title;
	this.positiveAffectedAttribute = positiveAffectedAttribute;
	this.negativeAffectedAttribute = negativeAffectedAttribute;
}

Policy.prototype.getPeoplePositivelyAffected = function(){
	var total = 0;
	for(var index = 0; index < citizens.length; index++){
		var citizen = citizens[index];
		if(citizen.hasAttribute(this.positiveAffectedAttribute)){
			total++;
		}
	}
	return total;
}

Policy.prototype.getPeopleNegativelyAffected = function(){
	var total = 0;
	for(var index = 0; index < citizens.length; index++){
		var citizen = citizens[index];
		if(citizen.hasAttribute(this.negativeAffectedAttribute)){
			total++;
		}
	}
	return total;
}

function Candidate(id, name, location, party, policies){
	this.id = id;
	this.name = name;
	this.location = location;
	this.party = party;
	this.policies = policies;
}

/*
* Used for creating game data when the game is loaded
*/
function init(){
	availableCitizenAttributes = [
	new AttributeContainer("Income", ["Lower class", "Middle class", "Upper class"]),
	new AttributeContainer("Age", ["Young", "Middle aged", "Elderly"]),
	new AttributeContainer("Job", ["Business owner", "Employed", "Not Employed"]),
	new AttributeContainer("Family", ["Parent", "Not parent"]),
	new AttributeContainer("Military", ["Active duty", "Veteran", "Civilian"]),
	new AttributeContainer("Criminal Record", ["Imprisoned", "Past record", "Clean record"]),
	new AttributeContainer("Communte Style", ["Car", "Bike", "Public transportation"]),
	new AttributeContainer("Activist", ["Anti-Violence", "Human Rights", "Not Activist"])
	];
	availablePolicies = [
		/*new PolicyContainer("Tax",
		[
			new Policy("Raise middle class tax", "", "Middle class"),
			new Policy("Lower middle class tax", "Middle class", ""),
			new Policy("Raise upper class tax & lower the middle class tax", "Middle class", "Upper class")
		]),*/
		new PolicyContainer("Public Transportation",[
			new Policy("Lower public transportation budget", "Car", "Public transportation"),
			new Policy("Raise public transportation budget", "Public transportation", "Car"),
			new Policy("Lower public transportation fair", "Public transportation", "Car"),
			new Policy("Raise public transportation fair", "Car", "Public transportation"),
			new Policy("Expand public transportation network", "Public transportation", "Car"),
			new Policy("Decrease public transportation network", "Car", "Public transportation")
		]),
		new PolicyContainer("Automobiles", [
			new Policy("Raise car tax", "Public transportation", "Car"),
			new Policy("Lower car tax", "Car", "Public transportation"),
			new Policy("Raise gas prices", "Bike", "Car"),
			new Policy("Lower gas prices", "Car", "Bike"),
			new Policy("Give tax benefits to zero emision commuters", "Bike", "Car")
		]),
		new PolicyContainer("Military", [
			new Policy("Lower Military budget", "Anti-Violence", "Active duty"),
			new Policy("Raise Military budget", "Active duty", "Anti-Violence"),
			new Policy("Increse veteran benefits", "Veteran", "Civilian"),
			new Policy("Decrease veteran benefits", "Civilian", "Veteran"),
			new Policy("Increase Military research budget", "Active duty", "Anti-Violence"),
			new Policy("Reduce Military research budget", "Anti-Violence", "Active duty")
		]),
		new PolicyContainer("Employment", [
			new Policy("Raise unemployment benefits", "Not Employed", "Employed"),
			new Policy("Lower unemployment benefits", "Employed", "Not Employed"),
			new Policy("Raise income tax", "Public transportation", "Employed"),
			new Policy("Lower income tax", "Employed", "Public transportation")
		]),
		new PolicyContainer("Business", [
			new Policy("Raise Business tax", "Public transportation", "Business owner"),
			new Policy("Lower Business tax", "Business owner", "Public transportation"),
			new Policy("Support small Business", "Business owner", "Upper class")
		])

		//Criminal stuff
		//Gov. aid
		//Law
		//Trade

	];
	availableParties = ["ReDublican Party", "DemoRat Party", "Ibertarian Party", 
	"Lependent Party", "Labo Party", "Riberal Party"];
	availableLocations = ["Slightly New York", "The Outback", "Mars", "ISS", "Kalifornia",
	"FloorIda", "Wishonsolo", "The Choclate Factory", "Paris, Le French", "The North Pole", 
	"West Korea", "Mother Russia", "Unknown", "CanaSorry"];
	availableNames = ["Congressman Bill", "Prince George", "Bob", "Billy bob", "Actor Bill Murray", 
	"Joe the plumber", "O' Lama", "Charles the 3rd", "Mayor Doomberg", "Astronaut Chris Hadfield", "Kony(2012)"];

	generateCitizens();
	generateCandidates();
}

/*
* Dynamically generate the UI
*/
$(document).ready(function(){

	var containerDiv = $('.container');
	for(var index = 0; index < candidates.length; index++){	
		var candidate = candidates[index];
		var candidateDiv = $('<div class="candidate-container"></div>');
		
		var candidateName = $('<p class="candidate-name"></p>');
		$(candidateName).text(candidate.name);
		var candidateInfo = $('<p class="candidate-info"></p>');
		$(candidateInfo).text(candidate.location + " | " + candidate.party);
		var policyHeader = $('<h3 class="policy-header">Policies</h3>');

		candidateDiv.append(candidateName);
		candidateDiv.append(candidateInfo);
		candidateDiv.append(policyHeader);

		for(var pIndex = 0; pIndex < candidate.policies.length; pIndex++){
			var policy = candidate.policies[pIndex];
			
			var policyTitle = $('<p class="policy-title"></p>');
			policyTitle.text(policy.title);
			candidateDiv.append(policyTitle);

			var policyEffects = $('<p class="policy-effects"></p>');
			var totalCitizens = citizens.length;
			var posEffect = (policy.getPeoplePositivelyAffected() / totalCitizens) * 100;
			var negEffect = (policy.getPeopleNegativelyAffected() / totalCitizens) * 100;
			var percentEffected = negEffect + posEffect;
			posEffect = posEffect.toFixed(0);
			negEffect = negEffect.toFixed(0);
			percentEffected = percentEffected.toFixed(0);
			$(policyEffects).text(percentEffected + "% of the population is effected by this policy. Of these people " + posEffect + "% are affected positively and " + negEffect + "% are affected negatively.")
			candidateDiv.append(policyEffects);

			var graphContainer = $('<div class="graph-container"></div>');
			var grayBar = $('<div class="graph-box graph-gray"></div>');
			var redBar = $('<div class="graph-box graph-red"></div>');
			var greenBar = $('<div class="graph-box graph-green"></div>');
			$(greenBar).css("width", posEffect + "px");
			$(redBar).css({"width": negEffect + "px", "padding-left": posEffect + "px"});

			graphContainer.append(grayBar);
			graphContainer.append(redBar);
			graphContainer.append(greenBar);

			candidateDiv.append(graphContainer);
			candidateDiv.append($('<br>'));
		}

		var voteButton = $('<button class="vote-button">Vote!</button>');
		$(voteButton).attr('id', candidate.id);
		var seperator = $('<hr class="candidate-seperator">');
		candidateDiv.append(voteButton);
		candidateDiv.append(seperator);

		containerDiv.append(candidateDiv);
	}

	//After everything is done
	$('.REMOVE-AFTER-LOAD').remove();

	$('.vote-button').on("click", function(){
		handleVote($(this).attr('id'));
	});

});

function generateCitizens(){
	for(var cIndex = 0; cIndex < 400; cIndex++){
		var party = getRandomParty();
		var attributes = [];
		for(aIndex = 0; aIndex < availableCitizenAttributes.length; aIndex++){
			attributes.push(availableCitizenAttributes[aIndex].getAttribute());
		}
		//console.log(party + " " + attributes); //These results are pretty funny
		citizens.push(new Citizen(party, attributes));
	}
}

function generateCandidates(){
	var toMake = getRandomNumberInRange(3, 5);
	for(var cIndex = 0; cIndex < toMake; cIndex++){
		var party = getRandomParty();
		var policies = [];
		for(pIndex = 0; pIndex < availablePolicies.length; pIndex++){
			policies.push(availablePolicies[pIndex].getPolicy());
		}
		//console.log(party + " " + policies);
		candidates.push(new Candidate(cIndex, getRandomName(), getRandomLocation(), party, policies));
	}
}

var policyIndex = 0;
var totalPolicies;

var graphContainer;
var marker;

function handleVote(id){
	$('.candidate-container').remove();
	electedCandidate = getCanidateByID(id);
	totalPolicies = electedCandidate.policies.length;

	//Create new UI
 	graphContainer = $('<div class="graph-container"></div>');
	graphContainer.append('<div class="green-half"></div>');
	graphContainer.append('<div id="red-half" class="red-half"></div>');
	marker = $('<div class="marker"></div>');
	graphContainer.append(marker);
	$('.container').append(graphContainer);
	$('.container').append('<h3 class="center-text">The Society Bar!</p>');
	$('.container').append('<p class="center-text">Watch how your leader changes society</p>');
	$('.container').append('<h2 class="current-policy">The current policy is...</h2>');

	processPolicies()
}

function processPolicies(){
	var policy = electedCandidate.policies[policyIndex];
	var posPeople = policy.getPeoplePositivelyAffected();
	var negPeople = policy.getPeopleNegativelyAffected();
	societyBar += posPeople - negPeople;
	console.log("Round = " + societyBar);

	var halfWidth = $('.red-half').width();
	console.log("H: " + halfWidth);
	$(marker).css("margin-left", halfWidth + societyBar + "px");
	$('.current-policy').text(policy.title);

	policyIndex++;
	if(policyIndex < totalPolicies){
		setTimeout(processPolicies, 2000);
	}
	else{
		displayEndGame();
	}
}

function displayEndGame(){
	if(societyBar >= 0){
		$('.container').append('<h1 class="win">Congrats, your vote was a good vote!');
	}
	else{
		$('.container').append('<h1 class="win">Congrats, you took society a step backwards. (You lost).');
	}
	//Credit stuff
	$('.container').append('<p class="center-text">Refresh to reset!</p>');
	$('.container').append('<a href="https://twitter.com/Thedeadlybutter">@thedeadlybutter</a>');
	console.log("Final = " + societyBar);
}

function getCanidateByID(id){
	for(var index = 0; index < candidates.length; index++){
		if(candidates[index].id == id){
			return candidates[index];
		}
	}
	return null;
}

function getRandomNumberInRange(min, max){
	return Math.random() * (max - min) + min;
}

function getRandomParty(){
	return availableParties[Math.floor(Math.random() * availableParties.length)];	
}

function getRandomLocation(){
	return availableLocations[Math.floor(Math.random() * availableLocations.length)];	
}

function getRandomName(){
	return availableNames[Math.floor(Math.random() * availableNames.length)];
}