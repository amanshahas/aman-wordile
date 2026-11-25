const WORDS = `
apple brave crane drink eagle flame grape house input joker
knife lemon mango night ocean piano queen river stone tiger
uncle vivid water youth zebra adore blend charm dwell event
frost glide honey ivory jolly karma lunar magic noble olive
pearl quiet relax smile trend unity vapor whale yield zesty
about above actor adult after again agent agree alarm album
alive allow alone amber angel angle angry apart arena arise
badge basic beach began being bench birth black blade blame
blank blast blind block bloom board boost brain brand bread
break brick bring broad brown brush build burst cabin candy
cargo carry catch cause chain chair chalk chase cheap check
chest chief child civic claim class clean clear climb clock
close cloud coach coast color couch count court cover craft
crash cream crisp crowd crown curve daily dance delta depth
diary dirty dream dress drift drive early earth elbow empty
enjoy equal error essay exact extra faith false fancy feast
fence fiber field final first flash fleet float floor flour
focus force forge frame fresh front fruit funny ghost giant
given glass globe glory grace grade grain grand grant grass
great green greet guard guess guest guide habit happy heart
heavy hello hobby horse hotel human humor ideal image index
inner issue jelly jewel judge juice label large laser later
laugh layer learn least legal level light limit linen local
logic loose lucky lunch magma major maple march match mayor
medal metal minor model money month moral motor mount mouse
mouth movie music nerve never noise north novel nurse offer
often orbit order other outer owner paint panel paper party
patch peace phone photo piece pilot pitch place plain plane
plant plate point polar pound power press price pride prime
print prize proof proud pulse punch quick quote radio raise
range rapid ratio reach ready realm right rival roast robot
rocky round route royal rural salad sauce scale scene scope
score sense shade shake shape share sharp sheep shelf shell
shift shine shirt shock short sight silly skill sleep slice
slide small smart smoke snack solid solve sound south space
spare spark speak speed spice spine spoon sport staff stage
stair stamp stand start steam steel stick storm story stove
sugar sunny super sweet swift table taste teach thank theme
thick thing think three throw thumb tight title toast today
topic torch total touch tower track trade trail train treat
trial tribe trick truck truly trust truth twist ultra under
union upper upset urban usual valid value video virus visit
vital vocal voice watch wheat wheel white whole woman world
worry worth would wound write wrong yeast young
`
  .trim()
  .split(/\s+/)
  .map((w) => w.toUpperCase())

export default WORDS
