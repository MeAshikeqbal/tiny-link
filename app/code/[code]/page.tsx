import { prisma } from "@/lib/prisma";
import { formatUTC } from "@/lib/date";
import { notFound } from "next/navigation";
import { BarChart3, Clock, LinkIcon } from "lucide-react";
import TargetCardClient from "@/components/link/TargetCardClient";

type Props = {
    params: {
        code: string;
    };
};


export default async function Page({ params }: Props) {
    const resolvedParams = await params as Props['params'];
    const { code } = resolvedParams ?? {};

    if (!code) return notFound();

    const link = await prisma.link.findUnique({
        where: { code },
        select: {
            id: true,
            code: true,
            targetUrl: true,
            clickCount: true,
            lstClickedAt: true,
            createdAt: true,
            deleted: true,
        },
    });

    if (!link || link.deleted) return notFound();

    return (
        <main className="min-h-screen bg-linear-to-br from-background to-muted/20">
            <div className="container mx-auto px-4 py-12">
                {/* Header Section */}
                <div className="mb-12">
                    <div className="flex items-center gap-2 mb-2">
                        <LinkIcon className="w-5 h-5 text-primary" />
                        <span className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Link Analytics</span>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
                        Short Link: <span className="text-primary">{link.code}</span>
                    </h1>
                    <p className="text-muted-foreground mt-2">Track and analyze your shortened URL performance</p>
                </div>

                {/* Main Content Grid */}
                <div className="grid gap-6 lg:grid-cols-3 mb-8">
                    {/* Primary Stats Cards */}
                    <div className="lg:col-span-1 space-y-6">
                        {/* Click Count Card */}
                        <div className="group relative overflow-hidden rounded-2xl bg-card border border-border p-8 transition-all hover:border-primary/50 hover:shadow-lg">
                            <div className="absolute inset-0 bg-linear-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                            <div className="relative z-10">
                                <div className="flex items-center justify-between mb-4">
                                    <span className="text-sm font-medium text-muted-foreground">Total Clicks</span>
                                    <BarChart3 className="w-5 h-5 text-primary" />
                                </div>
                                <div className="text-5xl font-bold text-foreground">{link.clickCount.toLocaleString()}</div>
                                <p className="text-xs text-muted-foreground mt-3">Track engagement</p>
                            </div>
                        </div>

                        {/* Last Clicked Card */}
                        <div className="group relative overflow-hidden rounded-2xl bg-card border border-border p-8 transition-all hover:border-primary/50 hover:shadow-lg">
                            <div className="absolute inset-0 bg-linear-to-br from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                            <div className="relative z-10">
                                <div className="flex items-center justify-between mb-4">
                                    <span className="text-sm font-medium text-muted-foreground">Last Clicked</span>
                                    <Clock className="w-5 h-5 text-accent" />
                                </div>
                                <div className="text-lg font-semibold text-foreground">
                                    {link.lstClickedAt ? formatUTC(link.lstClickedAt, "MMM dd, yyyy") : "Never"}
                                </div>
                                <p className="text-xs text-muted-foreground mt-3">
                                    {link.lstClickedAt ? formatUTC(link.lstClickedAt, "h:mm a") : "No activity yet"}
                                </p>
                            </div>
                        </div>
                    </div>
                    <TargetCardClient targetUrl={link.targetUrl} code={link.code} />
                </div>

                {/* Created Date Card */}
                <div className="group relative overflow-hidden rounded-2xl bg-card border border-border p-8 transition-all hover:border-primary/50 hover:shadow-lg">
                    <div className="absolute inset-0 bg-linear-to-r from-muted/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div className="relative z-10">
                        <div className="flex items-center justify-between mb-4">
                            <span className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Created Date</span>
                            <LinkIcon className="w-5 h-5 text-muted-foreground" />
                        </div>
                        <div className="grid grid-cols-2 gap-8 md:grid-cols-4 md:gap-12">
                            <div>
                                <p className="text-2xl font-bold text-foreground">{formatUTC(link.createdAt, "dd")}</p>
                                <p className="text-xs text-muted-foreground mt-2">{formatUTC(link.createdAt, "MMMM")}</p>
                            </div>
                            <div>
                                <p className="text-2xl font-bold text-foreground">{formatUTC(link.createdAt, "yyyy")}</p>
                                <p className="text-xs text-muted-foreground mt-2">Year</p>
                            </div>
                            <div>
                                <p className="text-2xl font-bold text-foreground">{formatUTC(link.createdAt, "EEEE")}</p>
                                <p className="text-xs text-muted-foreground mt-2">Day</p>
                            </div>
                            <div>
                                <p className="text-2xl font-bold text-foreground">{formatUTC(link.createdAt, "h:mm a")}</p>
                                <p className="text-xs text-muted-foreground mt-2">Time</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
