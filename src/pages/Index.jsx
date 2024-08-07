import { useState, useEffect } from "react";
import { Cat, Heart, Info, Paw, Camera } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { useToast } from "@/components/ui/use-toast";

const catBreeds = [
  { name: "Siamese", origin: "Thailand", temperament: "Vocal, Affectionate, Intelligent", image: "https://upload.wikimedia.org/wikipedia/commons/2/25/Siam_lilacpoint.jpg" },
  { name: "Persian", origin: "Iran", temperament: "Gentle, Quiet, Docile", image: "https://upload.wikimedia.org/wikipedia/commons/1/15/White_Persian_Cat.jpg" },
  { name: "Maine Coon", origin: "United States", temperament: "Gentle, Intelligent, Independent", image: "https://upload.wikimedia.org/wikipedia/commons/5/5f/Maine_Coon_cat_by_Tomitheos.JPG" },
  { name: "Bengal", origin: "United States", temperament: "Energetic, Playful, Curious", image: "https://upload.wikimedia.org/wikipedia/commons/b/ba/Paintedcats_Red_Star_standing.jpg" },
  { name: "Scottish Fold", origin: "Scotland", temperament: "Sweet-tempered, Intelligent, Soft-voiced", image: "https://upload.wikimedia.org/wikipedia/commons/5/5d/Adult_Scottish_Fold.jpg" },
];

const catFacts = [
  "Cats spend 70% of their lives sleeping.",
  "A group of cats is called a clowder.",
  "Cats have over 20 vocalizations, including the meow.",
  "A cat's hearing is much more sensitive than humans and dogs.",
  "Cats have a third eyelid called the 'haw' to protect their eyes.",
];

const CatCard = ({ breed, origin, temperament, image }) => (
  <Card className="mb-4 overflow-hidden">
    <img src={image} alt={breed} className="w-full h-48 object-cover" />
    <CardHeader>
      <CardTitle>{breed}</CardTitle>
      <CardDescription>Origin: {origin}</CardDescription>
    </CardHeader>
    <CardContent>
      <p><strong>Temperament:</strong> {temperament}</p>
    </CardContent>
  </Card>
);

const Index = () => {
  const [likes, setLikes] = useState(0);
  const [currentFactIndex, setCurrentFactIndex] = useState(0);
  const { toast } = useToast();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentFactIndex((prevIndex) => (prevIndex + 1) % catFacts.length);
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  const handleLike = () => {
    setLikes(likes + 1);
    toast({
      title: "Thanks for the love!",
      description: "You're pawsome! 🐾",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-100 to-pink-100 p-8">
      <div className="max-w-4xl mx-auto">
        <motion.h1 
          className="text-6xl font-bold mb-6 flex items-center justify-center text-purple-800"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Cat className="mr-2 text-pink-500" /> Purrfect Cats
        </motion.h1>
        
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Carousel className="mb-6">
            <CarouselContent>
              {catBreeds.map((breed, index) => (
                <CarouselItem key={index}>
                  <img
                    src={breed.image}
                    alt={breed.name}
                    className="mx-auto object-cover w-full h-[400px] rounded-lg shadow-lg"
                  />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </motion.div>

        <Tabs defaultValue="about" className="mb-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="about">About Cats</TabsTrigger>
            <TabsTrigger value="breeds">Cat Breeds</TabsTrigger>
          </TabsList>
          <TabsContent value="about">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Paw className="mr-2 text-pink-500" />
                  Fascinating Felines
                </CardTitle>
                <CardDescription>Learn about the charm and characteristics of cats</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-lg text-gray-700 mb-4">
                  Cats are fascinating creatures that have been domesticated for thousands of years. They are known for their independence, agility, and affectionate nature.
                </p>
                <h3 className="text-xl font-semibold mb-2">Characteristics of Cats</h3>
                <ul className="list-disc list-inside mb-4 text-gray-700">
                  <li>Excellent hunters with sharp claws and teeth</li>
                  <li>Flexible bodies and quick reflexes</li>
                  <li>Keen senses, especially their night vision</li>
                  <li>Soft fur and a variety of coat patterns</li>
                  <li>Communicate through meowing, purring, and body language</li>
                </ul>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="breeds">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Camera className="mr-2 text-pink-500" />
                  Popular Cat Breeds
                </CardTitle>
                <CardDescription>Explore some of the most beloved cat breeds</CardDescription>
              </CardHeader>
              <CardContent>
                {catBreeds.map((breed, index) => (
                  <CatCard key={index} {...breed} />
                ))}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="flex justify-center items-center space-x-4 mb-6">
          <Button 
            variant="outline" 
            onClick={handleLike}
            className="flex items-center"
          >
            <Heart className="mr-2 h-4 w-4 text-red-500" /> Like
          </Button>
          <Badge variant="secondary" className="text-lg">
            {likes} {likes === 1 ? 'Like' : 'Likes'}
          </Badge>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={currentFactIndex}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
          >
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <p className="text-center text-gray-600 italic cursor-help">
                    <Info className="inline mr-1 h-4 w-4" />
                    {catFacts[currentFactIndex]}
                  </p>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Click for more cat facts!</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Index;
