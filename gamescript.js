var citizens = [];
var candidates = [];

var availableParties = [];
var availableCitizenAttributes = [];
var availableLocations = [];

function AttributeContainer(name, listOfAttributes){
	this.name = name;
	this.listOfAttributes = listOfAttributes;
}

AttributeContainer.prototype.getAttribute = function(){
	return this.listOfAttributes[Math.floor(Math.random() * this.listOfAttributes.length)];	
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

function Candidate(name, location, party, policies){
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
	new AttributeContainer("Communte Style", ["Car", "Bike", "Public transportation"])
	];
	availableParties = ["ReDublican Party", "DemoRat Party", "Ibertarian Party", 
	"Lependent Party", "Labo Party", "Riberal Party"];
	availableLocations = ["Slightly New York", "The Outback", "Mars", "ISS", "Kalifornia",
	"FloorIda", "Wishonsolo", "The Choclate Factory", "Paris, Le French", "The North Pole", 
	"West Korea", "Mother Russia", "象形字關転"];
	test();
}

//new AttributeContainer("", []),

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
		$(candidateInfo).text(candidate.location + " " + candidate.party);
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
			posEffect = posEffect.toFixed(2);
			negEffect = negEffect.toFixed(2);
			percentEffected = percentEffected.toFixed(2);
			$(policyEffects).text(percentEffected + "% of the population is effected by this policy. Of these people " + posEffect + "% positively and " + negEffect + "% negatively.")
			candidateDiv.append(policyEffects);
		}

		var seperator = $('<hr class="candidate-seperator">');
		candidateDiv.append(seperator);

		containerDiv.append(candidateDiv);
	}

	//After everything is done
	$('.REMOVE-AFTER-LOAD').remove();
});

function test(){
	for(var cIndex = 0; cIndex < 100; cIndex++){
		var party = getRandomParty();
		var attributes = [];
		for(aIndex = 0; aIndex < availableCitizenAttributes.length; aIndex++){
			attributes.push(availableCitizenAttributes[aIndex].getAttribute());
		}
		//console.log(party + " " + attributes); //These results are pretty funny
		citizens.push(new Citizen(party, attributes));
	}
	citizens.push(new Citizen("t1", ["good"]));
	citizens.push(new Citizen("t2", ["bad"]));
	citizens.push(new Citizen("t3", ["good"]));
	candidates.push(new Candidate("Senator Poopy Head", "Mars", "Toilet party", [new Policy("Test policy", "good", "bad"), new Policy("Test policy 2", "bad", "good")]));
	candidates.push(new Candidate("Mayor Poopy Head", "Mars", "Toilet party", [new Policy("Test policy", "good", "bad"), new Policy("Test policy 2", "bad", "good")]));
}

function getRandomParty(){
	return availableParties[Math.floor(Math.random() * availableParties.length)];	
}